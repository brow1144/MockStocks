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
      currentPrice: 0,
      oneDay: 'selected',
      oneWeek: '',
      oneMonth: '',
      threeMonths: '',
      oneYear: '',
      all: '',
    }
  }

  componentWillMount() {
    let self = this;
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOGL&interval=5min&apikey=WIOGAHD0RJEEZ59V')

    // axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=AAPL&apikey=WIOGAHD0RJEEZ59V')
      .then(function (response) {
        // handle success
        let stockData = [];
        // let data = response.data['Monthly Adjusted Time Series']
        let data = response.data['Time Series (5min)'];

        for (let i in data) {
          stockData.unshift({
            x: new Date(i).getTime(),
            // y: parseFloat(data[i]['5. adjusted close']),
            y: parseFloat(data[i]['4. close']),
          })
        }  

        let withCommas = Number(parseFloat(stockData[stockData.length-1]['y']).toFixed(2)).toLocaleString('en');

        self.setState({
          stockData: stockData,
          currentPrice: withCommas,
        })

      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`);
        console.log(`Btw here is the error message\n\n`);
        console.log(error);
      })
  }

  handleTimeChange = (timeFrame) => {
  
    this.setState({
      oneDay: '',
      oneWeek: '',
      oneMonth: '',
      threeMonths: '',
      oneYear: '',
      all: '',
    }, () => {
      this.setState({
        [`${timeFrame}`]: 'selected',
      })
    })


    // Make call for new stock Data
  }

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
          name: 'AAPL',
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

    return (
      <Row style={{marginBottom: '1000em'}} className='blackBackground body_div'>
        <Col md='1'/>
        <Col style={{paddingTop: '7em'}} md='6'> 
          <h2 className='stockPrice'>${this.state.currentPrice}</h2>
          <br />          
          
          <b onClick={() => this.handleTimeChange('oneDay')} className={`timeFrame ${this.state.oneDay}`}>1D</b>
          <b onClick={() => this.handleTimeChange('oneWeek')} className={`timeFrame ${this.state.oneWeek}`}>1W</b>
          <b onClick={() => this.handleTimeChange('oneMonth')} className={`timeFrame ${this.state.oneMonth}`}>1M</b>
          <b onClick={() => this.handleTimeChange('threeMonths')} className={`timeFrame ${this.state.threeMonths}`}>3M</b>
          <b onClick={() => this.handleTimeChange('oneYear')} className={`timeFrame ${this.state.oneYear}`}>1Y</b>   
          <b onClick={() => this.handleTimeChange('all')} className={`timeFrame ${this.state.all}`}>All</b>

          <HighchartsReact
            className='highcharts-container'
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={stockOptions}
          />

        </Col>
        <Col md='1'/>
        <Col style={{paddingTop: '6em'}} md='2'>
          <StockList />
        </Col>

        <Col md='1'/>
      </Row>
    );
  }
}

export default Home;