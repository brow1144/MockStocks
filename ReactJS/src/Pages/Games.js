import React, {Component} from 'react';
import '../Static/CSS/CreateUser.css';

//import {Input, Button} from 'mdbreact';
import { Row, Col } from 'reactstrap';
import NavBar from '../Components/NavBar';
import MyStocks from '../Components/Games/MyStocks';
import Leaderboard from '../Components/Games/Leaderboard';
import CreateGame from '../Components/Games/CreateGame'
import GameList from '../Components/Games/GamesList';
import '../Static/CSS/Games.css';
import axios from 'axios';
import UpdateGame from "../Components/Games/UpdateGame";

class Games extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Array of user objects for the leaderboard
      users: [],
      // Array of player's stock objects
      myStocks: [],
      // Array of game objects
      myFloors: [],
      money: 0,
      uid: sessionStorage.getItem('uid'),
      //Current game object
      currentGame: {},
      //Current user
      currentUser: {},
      // Current users email
      email: "",
      leader: false,
    };
  }

  /**
   *
   * Retrieve array of game objects for a user
   *
   */

  componentWillMount () {
    // Make server call for data
    this.fetchGames();
  };

  /**
   * Initial call to data base for all the games
   */
  fetchGames = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Games/By/User/${this.state.uid}`)
      .then(function (response) {
        // handle success
        if (response != null) {
          let gameData = response.data;

          if (gameData.games.length !== 0) {
            // Set up the game data
            console.log("-1");
            self.setGameData(gameData.games);

          } else { // No games return
            // Get the current user's email
            axios.get(`http://localhost:8080/Portfol.io/${self.state.uid}`)
              .then(function (response) {
                // handle success
                let user = response.data;

                self.setState({
                  email: user.email,
                })

              }).catch(function (err) {
              console.log("Cannot get users for the current game");
              console.log(err);
            })
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)
        console.log(error);
      })
  }

  /**
   * Sets game info
   */
  setGameData = (games) => {
    let self = this;
      self.setState({
        myFloors: games,
        currentGame: games[0],
      }, () => {
        self.fetchUsers();
      })
  }

  /**
   * Gets all users for the current game
   */
  fetchUsers = () => {
    let self = this;
    // Call to the server to get all the user objects

    for (let x = 0; x < self.state.currentGame.active_players.length; x++) {
      axios.get(`http://localhost:8080/Portfol.io/${self.state.currentGame.active_players[x]}`)
        .then(function (response) {
          // handle success
          if (response != null) {
            self.processUser(response.data, x);
          }

        }).catch(function (err) {
          console.log("Cannot get users for the current game");
          console.log(err);
        })
    }

    self.leaderCheck();
  }

  /**
   * Processes each user
   * @param user
   * @param index in array
   */
  processUser = (user, index) => {
    let self = this;
    let newArray = self.state.users;
    newArray[index] = user;

    if (self.state.uid === user._id) {
      self.setState({
        email: user.email,
      })
    }

    self.setState({
      users: newArray,
    })
  }

  /**
   * Checks if the current user is the leader of a game
   */
  leaderCheck = () => {
    let self = this;
    if (self.state.currentGame != null && self.state.currentGame.leader_email === self.state.email) {
      self.setState({
        leader: true,
      })
    } else {
      self.setState({
        leader: false,
      })
    }
  }

  /**
   * Update the current game state and then add the users
   * para index is the index of the new floor from 0 to n
   */
  updateGame = (index) => {
    let self = this;
    if (self.state.myFloors.length !== 0) {
      let newFloor = self.state.myFloors[index];
      self.setState({
          currentGame: newFloor,
          users: []
        }, () => {
          self.leaderCheck();

          for (let x = 0; x < self.state.currentGame.active_players.length; x++) {
            axios.get(`http://localhost:8080/Portfol.io/${self.state.currentGame.active_players[x]}`)
              .then(function (response) {
                // handle success
                let user = response.data;
                self.processUser(user, x)

              }).catch(function (err) {
              console.log("Cannot get users for the current game");
              console.log(err);
            })
          }

        }
      )
    }
  }

  /**
   * Reload the page
   */
  reloadPage = () => {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar/>
        </div>
        <Row style={{paddingTop: '10em'}} className='blackBackground body_div'>
          <Col md="4"/>

          {this.state.currentGame != null && this.state.currentGame.game_name
            ?
            <Col md="5">
              <h5 id="floorName" className={"gamesText "}>Floor Name : {this.state.currentGame.game_name}</h5>
            </Col>
            :
            <Col md="5"/>
          }
        </Row>
        <Row style={{paddingTop: '2em'}} className='blackBackground body_div'>
          <Col>
            <Row>
              <Col md="1"/>

              {this.state.leader
                ?
                <Col md="2">
                  <h5 className={"gamesText "}>Floor Code : {this.state.currentGame.code}</h5>
                </Col>
                :
                <Col md="2"/>
              }
              <Col md="6"/>
              <Col md="3">
                <h5 className={"gamesText"}>Spending Money : ${this.state.money}</h5>
              </Col>
            </Row>
            {this.state.leader
              ? <Row>
                <Col md="1"/>
                <Col md="1">
                  <UpdateGame currentGame={this.state.currentGame}/>
                </Col>
                <Col md="10"/>
              </Row>
              : <Row/>
            }
            <Row  style={{paddingTop: '4em'}} className='blackBackground body_div'>
              <Col md='9'>
                <Row>
                <Col md='1'/>
                <Col md='5'>
                  <Leaderboard users={this.state.users}/>
                </Col>

                <Col md='5'>
                  <MyStocks/>
                </Col>
                  <Col md='1'/>
                </Row>
              </Col>

              <Col md='2'>
                <GameList updateGame={this.updateGame} myFloors={this.state.myFloors}/>
                <CreateGame reloadPage={this.reloadPage} email={this.state.email} uid={this.state.uid}/>
              </Col>
              <Col md='1'/>
            </Row>

          </Col>

        </Row>

      </div>
    );
  }
}

export default Games;