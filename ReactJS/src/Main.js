import React, {Component} from 'react'
import axios from 'axios';

import NavBar from './Components/NavBar'

class Main extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      currentGame: {},
      empty: false,
    }
  }

  componentWillMount() {
    this.fetchGames()
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
          <NavBar />     
        </div>  

        <this.props.component uid={this.props.uid} empty={this.state.empty} currentGame={this.state.currentGame} updateCurrentGame={this.updateCurrentGame} stock={this.props.stock}/>
      </div>
    );
  }
}

export default Main;