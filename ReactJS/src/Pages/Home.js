import React, {Component} from 'react'

import NavBar from '../Components/NavBar'
import StockList from '../Components/StockList'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import {Row, Col} from 'reactstrap'

import axios from 'axios'
import moment from 'moment'

import '../Static/CSS/Home.css'

class Home extends Component {
  
  constructor() {
    super()

    this.state = {
      stockData: [],
      currentPrice: 0,
    }
  }

  componentWillMount() {
    let self = this
    axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=WIOGAHD0RJEEZ59V')
      .then(function (response) {
        // handle success
        let stockData = []
        let data = response.data['Monthly Adjusted Time Series']
        // let data = response.data['Time Series (1min)']

        for (let i in data) {
          stockData.unshift({
            x: new Date(i).getTime(),
            y: parseFloat(data[i]['5. adjusted close']),
            // y: parseFloat(data[i]['4. close']),
          })
        }  

        self.setState({
          stockData: stockData,
          currentPrice: stockData[stockData.length-1]['y']
        })

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

      series: [{
          name: 'AAPL',
          data: this.state.stockData,
      }],

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%h:%M'
        },
      },

      tooltip: {
        valueDecimals: 2,
        valuePrefix: '$',
        valueSuffix: ' USD'
      },

    }

    return (
      <div>
        <NavBar />     

        <Row style={{paddingTop: '1.5em'}} className='blackBackground'>
          <Col sm='1'/>
          <Col sm='7'> 
            <h1 className='stockTitle'>Apple</h1>
            <h2 className='stockPrice'>${this.state.currentPrice}</h2>
            <HighchartsReact
              className='highcharts-container'
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={stockOptions}
            />
          </Col>
          <Col sm='1'/>
          <Col sm='2'>
            <StockList />
          </Col>

          <Col sm='1'/>
        </Row>
      </div>
    );
  }
}

export default Home;