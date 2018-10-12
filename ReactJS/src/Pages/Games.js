import React, {Component} from 'react';

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
      // Money the user has
      buying_power: 0,
      // User's uid
      uid: sessionStorage.getItem('uid'),
      // Current game object
      currentGame: {},
      // Current user
      currentUser: {},
      // Current user's stock data
      currentUserStocks: {},
      // Array of all the users' information in the current game
      userGame: [],
      // Current users email
      email: "",
      // Check if this is the leader of the game
      leader: false,
      // Count down timer state
      countdown: "",
      // Count down message
      countMessage: ""
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
    //this.timer();
  };

  /**
   * Initial call to data base for all the games
   */
  fetchGames = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Games/By/User/${this.state.uid}`)
      .then(function (response) {
        // handle success
        let gameData = response.data;

        if (gameData.games.length !== 0) {
          // Set up the game data
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

            if (err.response && err.response.data)
              console.log(err.response.data.error);
            else
              console.log(err);
          })
        }
      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
      })
  }

  /**
   * Sets game info for the first time
   */
  setGameData = (games) => {
    let self = this;
      self.setState({
        myFloors: games,
        currentGame: games[0],
      }, () => {
        self.timer();
        self.props.updateCurrentGame(games[0]);
        self.props.getGameData(games[0].code);
        // Call to the server to get all user objects for the current game
        for (let x = 0; x < self.state.currentGame.active_players.length; x++) {
          axios.get(`http://localhost:8080/Portfol.io/${self.state.currentGame.active_players[x]}`)
            .then(function (response) {
              // handle success
              if (response != null) {
                self.processUser(response.data, x);
                self.leaderCheck();
              }

            }).catch(function (err) {
            console.log("Cannot get users for the current game");

            if (err.response && err.response.data)
              console.log(err.response.data.error);
            else
              console.log(err);
          })
        }
      })
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
    // Flag to know if this is the current user
    let flag = false;

    // Check to see if given user is the current user
    if (self.state.uid === user._id) {
      flag = true;
      self.setState({
        email: user.email,
        currentUser: user,
      }, () => {
        // Loop over all the current user's games and set their buying power based on the game
        for (let i = 0; i < user.active_games.length; i++) {
          // Check if game code is equal to the code
          if (self.state.currentGame.code === user.active_games[i].code && user.active_games[i].buying_power != null) {
            self.setState({
              buying_power: parseFloat((user.active_games[i].buying_power).toFixed(2)),
            })
          }
        }
      })
    }

    // Go through a user's active games and add the current game data to the userGame array
    let ug = self.state.userGame;

    let tmp;
    // This block of code creates the userGame state which is used to populate the leaderboard and myStocks table

    // Loop over active games til we find the current one
    for (let i = 0; i < user.active_games.length; i++) {
      tmp = null;
      let totalA = 0;
      let totalOwned = 0;
      let stockString = "";
      let stockQuantity = [];

      // Check if game code is equal to the code of the game data
      if (self.state.currentGame.code === user.active_games[i].code) {
        // Create a string of the stocks to send to the server to then get the stock prices
        for (let j = 0; j < user.active_games[i].stocks.length; j++) {
          // Make a string of stocks to get
          stockQuantity.push(user.active_games[i].stocks[j].quantity);
          if (j === 0)
            stockString += user.active_games[i].stocks[j].name;
          else
            stockString += "," + user.active_games[i].stocks[j].name;
        }
        // Var to keep my list of needed stock data in
        let stockList = [];

        // Async call to hopefully clean up sync issues
        // Null check for user Stocks
        if (stockString !== "") {
          self.getStocks(stockString).then( function(result){
            if (result.data != null) {
              // Loop over the stocks array returned and put each object into a form I can use
              let index = 0;
              for (let b in result.data) {
                if (result.data.hasOwnProperty(b)) {
                  let tmpObj = {
                    price: parseFloat((result.data[b].quote.latestPrice).toFixed(2)),
                    quantity: stockQuantity[index],
                    symbol: result.data[b].quote.symbol,
                    total: parseFloat((stockQuantity[index] * result.data[b].quote.latestPrice).toFixed(2))
                  };
                  // Push each object to the stockList to use when calculating total later
                  stockList.push(tmpObj);
                  // Add number of
                  totalOwned += stockQuantity[index];

                  // Index for list of stocks
                  index++;
                }
              }

              // Loop over the stock objects returned and determine the user's total assets
              for (let a = 0; a < stockList.length; a++) {
                totalA += stockList[a].total;
              }
              totalA = parseFloat((totalA).toFixed(2));
              tmp = {
                code: user.active_games[i].code,
                buying_power: user.active_games[i].buying_power,
                trade_count: user.active_games[i].trade_count,
                stocks: user.active_games[i].stocks,
                username: user.username,
                totalAssets: totalA,
                totalOwned: totalOwned,
                stocksArray: stockList
              }

              // Make sure tmp is set
              // Add the tmp to the userGame obj state
              if (tmp != null)
                ug.push(tmp);

              // Check if this is the current user
              if (flag === true) {
                self.setState({
                  users: newArray,
                  userGame: ug,
                  currentUserStocks: tmp,
                })
              } else {
                self.setState({
                  users: newArray,
                  userGame: ug,
                })
              }
            }

          }).catch(function (err) {
            console.log("Cannot get stocks for the user");

            if (err.response && err.response.data)
              console.log(err.response.data.error);
            else
              console.log(err);
          })
        } else { // The user has no stocks
          tmp = {
            code: user.active_games[i].code,
            buying_power: user.active_games[i].buying_power,
            trade_count: user.active_games[i].trade_count,
            stocks: user.active_games[i].stocks,
            username: user.username,
            totalAssets: 0,
            totalOwned: 0,
            stocksArray: []
          }

          // Make sure tmp is set
          // Add the tmp to the userGame obj state
          if (tmp != null)
            ug.push(tmp);

          // Set the state
          self.setState({
            users: newArray,
            userGame: ug,
          })
        }

        //ug.sort(self.sortRank);

        break;
      }

      // Make sure tmp is set
      // Add the tmp to the userGame obj state
      if (tmp != null)
        ug.push(tmp);

      ug.sort(self.sortRank);

      console.log(ug)
      // Set the state
      self.setState({
        users: newArray,
        userGame: ug,
      })
    }


  }

  /**
   * Function to get the list of stock objects from API given a string of stock symbols
   * @param stockString: string of stock symbols to get, user: the user who information is being looked at
   * returns an array with the stockList as the 0 index and totalOwned as index 1
   */
  async getStocks (stockString) {

    return await axios.get(`http://localhost:8080/Portfol.io/Batch/Stock/${stockString}`);
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
   * Update the current game state and then add the users when a new game is clicked
   * para index is the index of the new floor from 0 to n
   */
  updateGame = (index) => {
    let self = this;
    if (self.state.myFloors.length !== 0) {
      let newFloor = self.state.myFloors[index];
      self.setState({
          currentGame: newFloor,
          users: [],
          userGame: [],
          currentUserStocks: {},
        }, () => {
          self.leaderCheck();
          self.props.updateCurrentGame(newFloor);
          self.props.getGameData(newFloor.code)

          for (let x = 0; x < self.state.currentGame.active_players.length; x++) {
            axios.get(`http://localhost:8080/Portfol.io/${self.state.currentGame.active_players[x]}`)
              .then(function (response) {
                // handle success
                let user = response.data;
                self.processUser(user, x)

              }).catch(function (err) {
              console.log("Cannot get users for the current game");

              if (err.response && err.response.data)
                console.log(err.response.data.error);
              else
                console.log(err);
            })
          }

        }
      )
    }
  }


  /**
   * Sorts the users based on total assets
   * array.sort(sortRank());
   */
  sortRank = () => {
    return function(a, b) {
      console.log(a.totalAssets)
      return b.totalAssets - a.totalAssets;
    };
  }

  /**
   * Reload the page
   */
  reloadPage = () => {
    window.location.reload();
  }

  timer = () => {
    let self = this;
    let x = setInterval(function() {

      // Get todays date and time
      let now = Date.now();

      if (self.state.currentGame != undefined) {
        // Find the distance between now and the count down date
        let distance;
        if (new Date(self.state.currentGame.start_time).getTime() < now) {
          distance = new Date(self.state.currentGame.end_time).getTime() - now;
          self.setState({
            countMessage: "Game Ends in: "
          })
        } else {
          distance = now - new Date(self.state.currentGame.start_time).getTime();
          self.setState({
            countMessage: "Game Starts in: "
          })
        }


        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        /*document.getElementById("demo").innerHTML = days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ";*/
        self.setState({
          countdown: days + "d " + hours + "h " + minutes + "m " + seconds + "s "
        })


        // If the count down is finished, write some text
        if (distance < 0) {
          self.setState({
            countdown: 0 + "d " + 0 + "h " + 0 + "m " + 0 + "s ",
            countMessage: "Game Completed: "
          })
        }
      }


    }, 1000);
  }

  render() {
    return (
      <div>

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

        <Row style={{paddingTop: '1em'}} className='blackBackground body_div'>
          <Col md="4"/>

          <Col md="5">
            <label className={"gamesText "}>{this.state.countMessage + this.state.countdown}</label>
          </Col>
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
                <h5 className={"gamesText"}>Buying Power : ${this.state.buying_power}</h5>
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
            <Row  style={{paddingTop: '4em'}} >
              <Col md='9'>
                <Row>
                <Col md='1'/>
                <Col md='5'>
                  <Leaderboard currentGame={this.state.currentGame} userGame={this.state.userGame}/>
                </Col>

                <Col md='5'>
                  <MyStocks currentUserStocks={this.state.currentUserStocks}/>
                </Col>
                  <Col md='1'/>
                </Row>
              </Col>

              <Col md='2' className='blackBackground body_div'>
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
