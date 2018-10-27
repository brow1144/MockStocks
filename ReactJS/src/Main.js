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
      gameOver: false,
      watching: false,
      watchlist: []
    }
  }

  componentWillMount() {
    this.fetchGames();
    this.fetchPrice();
    this.fetchWatchlist();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stock !== this.props.stock) {
      this.fetchPrice();
      this.isWatching();
    }

  }

  watchStock =()=>{
    let self = this;
    axios.post(`https://portfolio-408-main.herokuapp.com/Portfol.io/Watchlist/${this.props.uid}/${this.props.stock}`)
      .then((data) => {
        console.log("watched")
        this.fetchWatchlist()
      }).catch((err) => {
      console.log("Problem watching stock")
    });
    this.setState({
      watching: !self.state.watching
    })
  }

  removeStock =()=>{
    let self = this;
    axios.delete(`https://portfolio-408-main.herokuapp.com/Portfol.io/Watchlist/${this.props.uid}/${this.props.stock}`)
      .then((data) => {
        console.log("removed")
        this.fetchWatchlist()
      }).catch((err) => {
      console.log("Problem removing stock")
    });
    this.setState({
      watching: !self.state.watching
    })
  }

  isWatching =()=>{
    let self = this;
    console.log('HEREEEE')
    console.log(this.state.watchlist)
    for (let k in this.state.watchlist) {
      ///console.log("trying")
      console.log(this.state.watchlist[k].symbol)
      if (this.state.watchlist[k].symbol === this.props.stock) {
        console.log("true")
        self.setState({
          watching: true
        })
        return true;
      }
    }
    console.log("false")
    self.setState({
      watching: false
    })
    return false;
  }

  fetchWatchlist = () => {
    let self = this;
    axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/Watchlist/${this.props.uid}`)
      .then(function (response) {
        // handle success
        let watchlist = response.data;

        if (watchlist.length !== 0) {
          // Set up the game data
          self.setWatchlist(watchlist);
          self.isWatching();
        } else { // No watchlist return
          // Get the current user's email
          axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/${self.props.uid}`)
            .then(function (response) {
              // handle success
              let user = response.data;

              self.setState({
                email: user.email,
              })

            }).catch(function (err) {
            console.log("Cannot get watchlist for the current user");

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

  setWatchlist = (watchlist) => {
    let self = this;
    //console.log("got eem");
    self.setState({
      watchlist: watchlist,
    })
  }

  fetchPrice = () => {
    let self = this
    axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/Stock/${this.props.stock}/Day`)
        .then((response) => {
          // handle success
          let stockData = response.data;
          
          let withCommas = Number(parseFloat(stockData[stockData.length - 1]['y']).toFixed(2)).toLocaleString('en');

          if ((stockData).length < 5) {
            this.setState({visibleData: true})
          } else {
            this.setState({
              currentPriceFor: withCommas,
              currentPrice: stockData[stockData.length - 1]['y'],
            })
          }

        })
        .catch((error) => {
          // handle error

          self.setState({visible: true})

          console.log(`Oh no! Our API didn't respond. Please refresh and try again`);
          console.log(`Btw here is the error message\n\n`);

          if (error.response && error.response.data)
            console.log(error.response.data.error);
          else
            console.log(error);
        })
    }

  gameOver = () => {
    let now = moment();
    let start = new Date(this.state.currentGame.start_time);
    let end = new Date(this.state.currentGame.end_time);

    //console.log(this.state.currentGame)
    if( start > now ||  end < now) {
      this.setState({gameOver: true})
      //console.log("game is over")
    } else {
      this.setState({gameOver: false})
      //console.log("game is not over")
    }
  }


  /**
   * Initial call to data base for all the games
   */
  fetchGames = () => {
    let self = this;
    axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/Games/By/User/${this.props.uid}`)
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
    axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/${self.props.uid}/${game}`)
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

        <this.props.component removeStock={this.removeStock} watchStock={this.watchStock} watching={this.state.watching}
                              currentPriceFor={this.state.currentPriceFor} currentPrice={this.state.currentPrice}
                              gameOverFunc={this.gameOver} gameOver={this.state.gameOver} getGameData={this.getGameData}
                              gameData={this.state.gameData} uid={this.props.uid} empty={this.state.empty}
                              currentGame={this.state.currentGame} updateCurrentGame={this.updateCurrentGame} stock={this.props.stock}/>
      </div>
    );
  }
}

export default Main;