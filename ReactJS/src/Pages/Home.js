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
      visible: false,
      visibleData: false,
      selected: 'Day',
    }
  }

  componentWillMount() {
    this.getData();
  }

  showDataFromAPI = (stockData) => {
    let withCommas = Number(parseFloat(stockData[stockData.length-1]['y']).toFixed(2)).toLocaleString('en');

    this.setState({visible: false})

    if (Object.keys(stockData).length < 5) {
      this.setState({visibleData: true})
    } else {
      this.setState({
        stockData: stockData,
        currentPrice: stockData[stockData.length-1]['y'],
        currentPriceFor: withCommas
      })
    }
  }

  getData() {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Stock/MSFT/${this.state.selected}`)
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

  onDismiss = () => {
    this.setState({ visible: false })
  }


  handleTimeChange = (timeFrame) => {
    this.setState({
      selected: timeFrame,
    }, () => this.getData());

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
          name: 'MSFT',
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
      errorMessage = <p style={{color: 'whitesmoke'}}>Oh no! Our API did not respond, please refresh to get the updated data!</p>
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
          <h2 className='stockPrice'>${this.state.currentPriceFor}</h2>

          <br />
          {errorMessage}
          {notEnoughData}

          <b id='day' onClick={() => this.handleTimeChange('Day')} className={`timeFrame ${this.state.selected === 'Day' ? 'selected' : ''}`}>1D</b>
          <b id='month' onClick={() => this.handleTimeChange('Month')} className={`timeFrame ${this.state.selected === 'Month' ? 'selected' : ''}`}>1M</b>
          <b id='triMonth' onClick={() => this.handleTimeChange('TriMonth')} className={`timeFrame ${this.state.selected === 'TriMonth' ? 'selected' : ''}`}>3M</b>
          <b id='year' onClick={() => this.handleTimeChange('Year')} className={`timeFrame ${this.state.selected === 'Year' ? 'selected' : ''}`}>1Y</b>
          <b id='all' onClick={() => this.handleTimeChange('All')} className={`timeFrame ${this.state.selected === 'All' ? 'selected' : ''}`}>All</b>

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
