import React, {Component} from 'react'

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import BuySellCard from '../Components/BuySellCard'

import {Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

import '../Static/CSS/StockPage.css';

import axios from 'axios'

class StockPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockData: [],
      // currentPrice: 0,
      // currentPriceFor: '',
      selected: 'Day',
      visibleData: false,
      visible: false,
      timeout: false,
      // stockCache: {
      //   month: {},
      //   threeMonths: {},
      //   oneYear: {},
      //   all: {},
      // },
    }
  }

  componentWillMount() {
    this.getData();
    //let self = this;
    // Cache Stuff Go here eventually
    // axios.get(`https://portfolio-408-defect.herokuapp.com//Portfol.io/Stock/${this.props.stock}/${this.state.selected}`)
    //   .then((response) => {
    //     // handle success
    //     let stockData = response.data;
        
    //     let withCommas = Number(parseFloat(stockData[stockData.length - 1]['y']).toFixed(2)).toLocaleString('en');
        
    //     if ((stockData).length < 5) {
    //       this.setState({visibleData: true})
    //     } else {
    //       this.setState({
    //         currentPriceFor: withCommas,
    //         currentPrice: stockData[stockData.length - 1]['y'],
    //       })
    //     }

    //   })
    //   .catch((error) => {
    //     // handle error

    //     self.setState({visible: true})

    //     console.log(`Oh no! Our API didn't respond. Please refresh and try again`);
    //     console.log(`Btw here is the error message\n\n`);

    //     if (error.response && error.response.data)
    //       console.log(error.response.data.error);
    //     else
    //       console.log(error);
    //   })
  }

  componentDidUpdate(prevProps) {
    if(JSON.stringify(this.props.stock) !== JSON.stringify(prevProps.stock)) {
      this.getData();
    }
    //console.log(this.props.watching)
  }

  showDataFromAPI = (stockData) => {
    //let withCommas = Number(parseFloat(stockData[0]['y']).toFixed(2)).toLocaleString('en');

    this.setState({visible: false})

    if ((stockData).length < 5) {
      this.setState({visibleData: true})
    } else {
      this.setState({
        visibleData: false,
        stockData: stockData,
        // currentPrice: stockData[0]['y'],
        // currentPriceFor: withCommas
      })
    }
  }

  getData = () => {
    let self = this;
    // Cache Stuff Go here eventually
    axios.get(`https://portfolio-408-defect.herokuapp.com//Portfol.io/Stock/${this.props.stock}/${this.state.selected}`)
      .then((response) => {
        // handle success
        let stockData = response.data;
        this.showDataFromAPI(stockData);
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

  handleTimeChange = (timeFrame) => {
    this.setState({
      selected: timeFrame,
    }, () => this.getData());

  };

  timeoutToggle = () => {
    this.setState({timeout: false})
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
          hour: '%I %p'
        },
      },
      tooltip: {
        valueDecimals: 2,
        valuePrefix: '$',
        valueSuffix: ' USD',
        xDateFormat: '%I %M %p'
      },
      rangeSelector: {
        enabled: false
      },
    };

    let errorMessage;
    if (this.state.visible) {
      errorMessage = <p style={{color: 'whitesmoke'}}>Oh no! Our API did not respond, please refresh to get the updated data!</p>
    } else {
      errorMessage = null;
    }

    let errorMessage2;
    if (this.state.visibleData) {
      errorMessage = <p style={{color: 'whitesmoke'}}>Oh no! We don't have enough datapoints for this!</p>
    } else {
      errorMessage = null;
    }

    return (
      <Row style={{marginBottom: '1000em'}} className='blackBackground body_div'>
        <Col md='1'/>
        <Col style={{paddingTop: '7em'}} md='6'>

          <h1 className='stockTitle'>{this.props.stock}</h1>
          <h2 className='stockPrice'>${this.props.currentPriceFor}</h2>

          {errorMessage}
          {errorMessage2}

          <b id='day' onClick={() => this.handleTimeChange('Day')} className={`timeFrame ${this.state.selected === 'Day' ? 'selected' : ''}`}>1D</b>
          <b id='month' onClick={() => this.handleTimeChange('Month')} className={`timeFrame ${this.state.selected === 'Month' ? 'selected' : ''}`}>1M</b>
          <b id='triMonth' onClick={() => this.handleTimeChange('TriMonth')} className={`timeFrame ${this.state.selected === 'TriMonth' ? 'selected' : ''}`}>3M</b>
          <b id='year' onClick={() => this.handleTimeChange('Year')} className={`timeFrame ${this.state.selected === 'Year' ? 'selected' : ''}`}>1Y</b>
          {/* <b id='all' onClick={() => this.handleTimeChange('All')} className={`timeFrame ${this.state.selected === 'All' ? 'selected' : ''}`}>All</b> */}

          <HighchartsReact
            className='highcharts-container'
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={stockOptions}
          />
        </Col>

        <Modal isOpen={this.state.timeout} toggle={this.timeoutToggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          Your game is over. Buying and selling stocks is now locked.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Col md='1'/>
        <Col style={{paddingTop: '6em'}} md='2'>
          {this.props.empty
            ?
              <BuySellCard removeStock={this.props.removeStock} watchStock={this.props.watchStock} watching={this.props.watching} gameOver={this.props.gameOver} getGameData={this.props.getGameData} gameData={this.props.gameData} uid={this.props.uid} currentGame={this.props.currentGame} stock={this.props.stock} currentPriceFor={this.props.currentPriceFor} currentPrice={this.props.currentPrice}/>
            :
              null
          }
        </Col>

        <Col md='1'/>
      </Row>
    );
  }
}

export default StockPage;
