import React, {Component} from 'react'
import axios from 'axios';

import NavBar from './Components/NavBar'
import moment from "moment";

class Main extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      currentGame: {},
      empty: false,
      gameData: {},
      gameOver: false
    }
  }

  componentWillMount() {
    console.log("mounting")
    this.fetchGames();
  }

  gameOver = () => {
    let now = moment();
    let start = new Date(this.state.currentGame.start_time);
    let end = new Date(this.state.currentGame.end_time);

    console.log(this.state.currentGame)
    if( start > now ||  end < now) {
      this.setState({gameOver: true})
      console.log("game is over")
    } else {
      this.setState({gameOver: false})
      console.log("game is not over")
    }
  }


  /**
   * Initial call to data base for all the games
   */
  fetchGames = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Games/By/User/${this.props.uid}`)
      .then(function (response) {
        // handle success
        let gameData = response.data;

        if (gameData.games.length !== 0) {
          // Set up the game data
          self.setState({
            currentGame: gameData.games[0],
            empty: true,
          }, () => {
            self.getGameData(gameData.games[0].code)
            self.gameOver();
          });

        } else { // No games return
          // Get the current user's email
            console.log("NO GAMES")
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


  getGameData = (game) => {
    let self = this
    axios.get(`http://localhost:8080/Portfol.io/${self.props.uid}/${game}`)
      .then((data) => {
        self.setState({gameData: data.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  updateCurrentGame = (game) => {
    this.setState({
      currentGame: game,
      empty: true,
    })
  }
  
  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar currentGame={this.state.currentGame}/>     
        </div>  

        <this.props.component gameOverFunc={this.gameOver} gameOver={this.state.gameOver} getGameData={this.getGameData} gameData={this.state.gameData} uid={this.props.uid} empty={this.state.empty} currentGame={this.state.currentGame} updateCurrentGame={this.updateCurrentGame} stock={this.props.stock}/>
      </div>
    );
  }
}

export default Main;