import React, {Component} from 'react'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import BuySellCard from '../Components/BuySellCard'

import {Row, Col} from 'reactstrap'

import axios from 'axios'

class StockPage extends Component {
  constructor() {
    super()

    this.state = {
      stockData: [],
      currentPrice: 0,
    }
  }

  componentWillMount() {
    let self = this
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${this.props.stock}&apikey=WIOGAHD0RJEEZ59V`)
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
          name: this.props.stock,
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
      <Row style={{marginBottom: '1000em'}} className='blackBackground body_div'>
        <Col md='1'/>
        <Col style={{paddingTop: '7em'}} md='6'> 
          <h1 className='stockTitle'>{this.props.stock}</h1>
          <h2 className='stockPrice'>${this.state.currentPrice}</h2>
          <HighchartsReact
            className='highcharts-container'
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={stockOptions}
          />
        </Col>
        <Col md='1'/>
        <Col style={{paddingTop: '6em'}} md='2'>
          <BuySellCard stock={this.props.stock} currentPrice={this.state.currentPrice}/>
        </Col>

        <Col md='1'/>
      </Row>
    );
  }
}

export default StockPage;