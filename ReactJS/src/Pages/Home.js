import React, {Component} from 'react'

// import NavBar from '../Components/NavBar'
import StockList from '../Components/StockList'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import {Row, Col} from 'reactstrap'

import axios from 'axios'
// import moment from 'moment'

import '../Static/CSS/Home.css'
import '../Static/CSS/StockPage.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stockData: [],
      watchlist: [],
      currentPrice: 0,
      visible: false,
      visibleData: false,
      watchlistFetched: false,
      selected: 'Day',
    }
  }

  componentWillMount() {
    this.getData();
    this.fetchWatchlist();
  }

  componentWillReceiveProps(props) {
    const { currentGame } = this.props;

    this.stateGetData(this.props.currentGame);
  }

  showDataFromAPI = (stockData) => {

    let withCommas = Number(parseFloat(stockData[stockData.length-1]['y']).toFixed(2)).toLocaleString('en');

    this.setState({visible: false})

    if ((stockData).length < 5) {
      this.setState({visibleData: true})
    } else {
      this.setState({
        stockData: stockData,
        currentPrice: stockData[stockData.length-1]['y'],
        currentPriceFor: withCommas
      })
    }
  } 

  stateGetData = (game) => {
    let self = this;
    
    //TODO If no game, don't show graph
  
      axios.get(`http://localhost:8080/Portfol.io/Games/History/${this.props.uid}/${game.code}`)
      .then((response) => {
        // handle success
        let stockData = response.data;
        this.showDataFromAPI(stockData);
      })
      .catch((error) => {
        // handle error

        self.setState({visible: true})

        console.log(`No data to be shown`);

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
        // console.log(`Btw here is the error message\n\n`);
        // console.log(error);
      })
    
  }

  getData = () => {
    let self = this;
    
    //TODO If no game, don't show graph

    if (this.props.currentGame !== {} && this.props.currentGame !== null && this.props.currentGame !== undefined) {
      axios.get(`http://localhost:8080/Portfol.io/Games/History/${this.props.uid}/${this.props.currentGame.code}`)
      .then((response) => {
        // handle success
        let stockData = response.data;
        this.showDataFromAPI(stockData);
      })
      .catch((error) => {
        // handle error

        self.setState({visible: true})

        console.log(`Oh no! Our API didn't respond. Please refresh and try again`);

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
        // console.log(`Btw here is the error message\n\n`);
        // console.log(error);
      })
    }
  }

  //   axios.get(`http://localhost:8080/Portfol.io/Stock/MSFT/${this.state.selected}`)
  //     .then((response) => {
  //       // handle success
  //       let stockData = response.data;
  //       this.showDataFromAPI(stockData);
  //     })
  //     .catch((error) => {
  //       // handle error

  //       self.setState({visible: true})

  //       console.log(`Oh no! Our API didn't respond. Please refresh and try again`);

  //       if (error.response && error.response.data)
  //         console.log(error.response.data.error);
  //       else
  //         console.log(error);
  //       // console.log(`Btw here is the error message\n\n`);
  //       // console.log(error);
  //     })
  // }

  onDismiss = () => {
    this.setState({ visible: false })
  }


  handleTimeChange = (timeFrame) => {
    this.setState({
      selected: timeFrame,
    }, () => this.getData());

  };

  fetchWatchlist = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Watchlist/${this.props.uid}`)
      .then(function (response) {
        // handle success
        let watchlist = response.data;

        if (watchlist.length !== 0) {
          // Set up the game data
          self.setWatchlist(watchlist);

        } else { // No watchlist return
          // Get the current user's email
          axios.get(`http://localhost:8080/Portfol.io/${self.props.uid}`)
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
    // console.log("got eem");
    self.setState({
      watchlist: watchlist,
      watchlistFetched: true,
    })
  };

  render() {

    const stockOptions = {
      chart: {
        color: 'whitesmoke',
        backgroundColor: '#1B1B1D',
        style: {
            color: 'whitesmoke',
        }
      },
      series: [{
          // name: 'MSFT',
          data: this.state.stockData,
      }],
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%I %p'
        },
      },
      tooltip: {
        valueDecimals: 2,
        valuePrefix: '$',
        valueSuffix: ' USD',
        xDateFormat: '%I %M %p'
      },
      rangeSelector:{
        enabled:false
      },
    };

    let errorMessage;
    if (this.state.visible) {
      errorMessage = <p style={{color: 'whitesmoke'}}>No data to show</p>
    } else {
      errorMessage = null;
    }

    let notEnoughData;
    if (this.state.visibleData) {
      notEnoughData = <p style={{color: 'whitesmoke'}}>Oh no! You don't have enough data to show!</p>
    } else {
      notEnoughData = null;
    }

    return (
      <Row style={{marginBottom: '1000em'}} className='blackBackground body_div'>
        <Col md='1'/>
        <Col style={{paddingTop: '7em'}} md='6'>
          <h3 className={'stockPrice'}>Your Portfolio History</h3>
          <br/>
          {this.state.visible || this.state.visibleData
            ?
            <div>
              {notEnoughData}
              {errorMessage}
            </div>
            :
            <div>
              <h2 className='stockPrice'>${this.state.currentPriceFor}</h2>

              <br />
              <HighchartsReact
                className='highcharts-container'
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={stockOptions}
              />
            </div>
          }
        </Col>
        <Col md='1'/>
        {this.state.watchlistFetched
          ?
          <Col style={{paddingTop: '6em'}} md='2'>
            <StockList watchlist={this.state.watchlist} />
          </Col>
          :
          <Col style={{paddingTop: '6em'}} md='2'/>
        }

        <Col md='1'/>
      </Row>
    );
  }
}

export default Home;
