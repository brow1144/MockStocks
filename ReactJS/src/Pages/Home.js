import React, {Component} from 'react';

import NavBar from '../Components/NavBar';

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import {Row, Col} from 'reactstrap';

import moment from 'moment';

import axios from 'axios';

// import '../Static/CSS/Home.css';
// import '../../node_modules/highcharts/css/themes/dark-unica.css';
// import '../../node_modules/highcharts/css/highcharts.css';

class Home extends Component {
  
  constructor() {
    super()

    this.state = {
      stockData: [],
    }
  }

  componentWillMount() {
    let self = this
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=DVMT&interval=1min&apikey=WIOGAHD0RJEEZ59V')
      .then(function (response) {
        // handle success
    
        let stockData = []
        let data = response.data['Time Series (1min)']
        for (let i in data) {
          let temp = []
          temp.push(parseInt(moment(i).unix()))
          temp.push(parseFloat(data[i]['4. close']))
          stockData.unshift(temp)
        }        
        self.setState({stockData})
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }

  render() { 

    const stockOptions = {
      rangeSelector: {
        selected: 1
      },

      title: {
          text: 'AAPL Stock Price'
      },

      series: [{
          name: 'AAPL',
          data: this.state.stockData,
          tooltip: {
              valueDecimals: 2
          }
      }]
    }

    return (
      <div>
        <NavBar />

        {/* <Row>
          <Col sm='2'/>
          <Col sm='8'> */}
            {/* <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={stockOptions}
            /> */}
          {/* </Col>
          <Col sm='2'/>
        </Row> */}
        
      </div>
    );
  }
}

export default Home;