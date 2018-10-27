import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from "axios/index";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import '../../Static/CSS/Home.css'
import '../../Static/CSS/Games.css'

class Leaderboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userList: this.props.users,
      curUsers: [],
      totalAssets: 0,
      rank: 0,
      tradesRemaining: 0,
      username: "",

      stockData: [],
      watchlist: [],
      currentPrice: 0,
      visible: false,
      visibleData: false,
      selected: 'Day',

      // Modal stuff
      open: false,
      name: "",
    };
  }

  componentWillMount () {
    this.setState({
      visible: false,
      visibleData: false,
    })
  }

  /**
   * Displays graph of user's history
   */
  showGraph = (uid, user) => {

    let self = this;
    self.setState({
      stockData: [],
      currentPrice: 0,
      currentPriceFor: 0,
    })

    // Get data to display graphs
    axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/Games/History/${uid}/${this.props.currentGame.code}`)
      .then((response) => {
        // handle success
        let stockData = response.data;
        // Adds a current data point to the leaderboard graph
        let currentPoint = {
          x: Date.now(),
          y: user.totalAssets,
        }
        stockData.push(currentPoint);

        self.showDataFromAPI(stockData, user.username);
      })
      .catch((error) => {
        // handle error

        self.setState({visible: true})

        console.log(`Oh no! Our API didn't respond. Please refresh and try again`);

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
      })
  }

  showDataFromAPI = (stockData, username) => {

    let withCommas = Number(parseFloat(stockData[stockData.length-1]['y']).toFixed(2)).toLocaleString('en');

    this.setState({
      visible: false,
      open: true,
      name: username
    })

    if ((stockData).length < 5) {
      this.setState({visibleData: true})
    } else {
      this.setState({
        stockData: stockData,
        currentPrice: stockData[stockData.length-1]['y'],
        currentPriceFor: withCommas,
        open: true,
      })
    }
  }

  /**
   * Closes modal
   */
  close = () => {
    this.setState({
      open: false
    });
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
      <div  className='blackBackground'>
        <h5 className={"gamesText"}>Leaderboard</h5>
        <Modal centered={true} size={"lg"} isOpen={this.state.open} toggle={this.close}>
          <ModalHeader style={{color: 'whitesmoke'}} className="blackBackground gameText" toggle={this.close}>
           {this.state.name}
            </ModalHeader>
          <ModalBody className='blackBackground'>

            {errorMessage}
            {this.state.visibleData
              ?
              <div>
              {notEnoughData}
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


          </ModalBody>
        </Modal>
        {this.props.userGame.length !== 0
          ?
        <Table className={"z-depth-5 cenText"} dark hover>
          <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Assets</th>
            <th>Trades Left</th>
          </tr>
          </thead>
          <tbody style={{cursor: 'pointer'}}>
            {this.props.userGame.map((user, key) => {
              return (<tr id={key} onClick={() => this.showGraph(user.uid, user)} key={key}>
                <th scope="row">{key + 1}</th>
                <th id={"name"}>{user.username}</th>
                <th id={"total" + key}>${parseFloat((user.totalAssets).toFixed(2)).toLocaleString()}</th>
                {this.props.currentGame.trade_limit === 0
                  ?
                  <th>Unlimited</th>
                  :
                  <th>{this.props.currentGame.trade_limit - user.trade_count} / {this.props.currentGame.trade_limit}</th>
                }
              </tr>)
            })}
          </tbody>
        </Table>
        :
        <div>
          <br/>
          <p className={"gamesText"}>There are no users in the game</p>
        </div>

        }
      </div>
    );
  }
}

export default Leaderboard;