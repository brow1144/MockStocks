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
      floorCode: "",
      floorName: "xxN0Sc0p35xx",
      uid: sessionStorage.getItem('uid'),
      //Current game object
      currentGame: {},
    };
  }

  /**
   *
   * Retrieve array of game objects for a user
   *
   */

  componentWillMount () {
    // Make server call for data
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Games/By/User/${this.state.uid}`)
      .then(function (response) {
        // handle success
        let gameData = response.data;

        self.setState({
          myFloors: gameData.games,
          currentGame: gameData.games[0],
        }, () => {
          // Second call to the server to get all the user objects
          for (let x = 0; x < self.state.currentGame.active_players.length; x++) {
            axios.get(`http://localhost:8080/Portfol.io/${self.state.currentGame.active_players[x]}`)
              .then(function (response) {
                // handle success
                let user = response.data;
                let newArray = self.state.users;
                newArray[x] = user;

                self.setState({
                  users: newArray,
                })

              }).catch(function (err){
                console.log("Cannot get users for the current game");
                console.log(err);
              })
          }})

      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)
        console.log(error);
      })

    console.log("Finished");
  };



  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar/>
        </div>
        <Row style={{paddingTop: '9em'}} className='blackBackground body_div'>
          <Col md="4"/>
          <Col md="5">
            <h5 className={"gamesText "}>Floor Name : {this.state.floorName}</h5>
          </Col>
        </Row>
        <Row style={{paddingTop: '2em'}} className='blackBackground body_div'>

          <Col>

            <Row>
              <Col md="1"/>
              <Col md="2">
                <h5 className={"gamesText"}>Floor Code : {this.state.floorCode}</h5>
              </Col>
              <Col md="6"/>
              <Col md="3">
                <h5 className={"gamesText"}>Spending Money : ${this.state.money}</h5>
              </Col>
            </Row>

            <Row  style={{paddingTop: '4em'}} className='blackBackground body_div'>
              <Col md='9'>
                <Row>
                <Col md='1'/>
                <Col md='5'>
                  <Leaderboard/>
                </Col>

                <Col md='5'>
                  <MyStocks/>
                </Col>
                  <Col md='1'/>
                </Row>
              </Col>



              <Col md='2'>
                <GameList myFloors={this.state.myFloors}/>
                <CreateGame/>
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