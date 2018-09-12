import React, {Component} from 'react';

import NavBar from '../Components/NavBar';

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import {Row, Col} from 'reactstrap';

import axios from 'axios';

import '../Static/CSS/Home.css';
// import '../../node_modules/highcharts/css/themes/dark-unica.css';

class Home extends Component {
  
  constructor() {
    super()

    this.state = {
      stockData: [],
    }
  }

  componentWillMount() {
    let self = this
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=AAPL&apikey=WIOGAHD0RJEEZ59V')
      .then(function (response) {
        // handle success
        let stockData = []
        let data = response.data['Monthly Adjusted Time Series']

        for (let i in data) {
          stockData.unshift({
            x: new Date(i).getTime(),
            y: parseFloat(data[i]['5. adjusted close']),
          })
        }  

        self.setState({stockData})

      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)
        console.log(error);
      })

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

      title: {
          text: 'AAPL Stock Price'
      },

      series: [{
          name: 'AAPL',
          data: this.state.stockData,
      }],

      xAxis: {
        type: 'datetime',
        labels: {
          formatter: function() {
             return Highcharts.dateFormat('%e %b', this.value*1000); // milliseconds not seconds
          },
        }
      }
    }

    return (
      <div>
        <NavBar />

        <Row className='blackBackground'>
          <Col  sm='2'/>
          <Col  sm='8'> 
            <HighchartsReact
              className='highcharts-container'
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={stockOptions}
            />
          </Col>
          <Col sm='2'/>
        </Row>
        
      </div>
    );
  }
}

export default Home;