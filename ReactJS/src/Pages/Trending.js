import React, {Component} from 'react';

import { Row, Col, Button } from 'reactstrap';
import { Table } from 'reactstrap'
import axios from "axios/index";

class Trending extends Component {

  constructor(props){
    super(props);

    this.state = {
      visible: false,
      dailyTrending: null,
      weeklyTrending: null,
      topTen: null,
      selectedRange: "daily"
    };

    this.dailyClicked = this.dailyClicked.bind(this);
    this.weeklyClicked = this.weeklyClicked.bind(this);
  }

  componentWillMount() {
    this.getDailyData();
  }

  isVisible() {
    return this.state.visible;
  }

  dailyActive() {
    return (this.state.selectedRange === "daily");
  };

  weeklyActive() {
    return (this.state.selectedRange === "weekly");
  };

  dailyClicked() {
    this.setState({
      selectedRange: "daily",
      topTen: this.state.dailyTrending,
    });
  }

  weeklyClicked() {
    this.setState({
      selectedRange: "weekly",
    });

    if(this.state.weeklyTrending === null){
      this.setState({
        visible: false,
      });
      this.getWeeklyData();
    } else {
      this.setState({
        topTen: this.state.weeklyTrending,
      });
    }
  }

  getDailyData = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Trending/day`)
      .then((response) => {
        //success
        let data = response.data;
        //console.log("Daily data: " + data);
        self.setState({
          dailyTrending: data,
          topTen: data,
          visible: true
        });
      })
      .catch((error) => {
        // handle error
        console.log(`Oh no! Our API didn't respond with the daily data. Please refresh and try again`);
        console.log(`Btw here is the error message\n\n`);

        if (error.response && error.response.data){
          console.log(error.response.data.error);
        }
        else {
          console.log(error);
        }
      });
  };

  getWeeklyData = () => {
    let self = this;
    axios.get(`http://localhost:8080/Portfol.io/Trending/week`)
      .then((response) => {
        //success
        let data = response.data;
        //console.log("Weekly data: " + data);
        self.setState({
          weeklyTrending: data,
          topTen: data,
          visible: true
        });
      })
      .catch((error) => {
        // handle error
        console.log(`Oh no! Our API didn't respond with the daily data. Please refresh and try again`);
        console.log(`Btw here is the error message\n\n`);

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
      });
  };

  render() {
    return (
      <div>

        <Row style={{paddingTop: '10em'}} className='blackBackground body_div'>
          <Col sm='2' md='2'/>
          <Col sm='5' md='5'>
            <h3 style={{color: 'whitesmoke'}}>Trending Stocks</h3>
          </Col>
          <Col sm='4' md='4' >
            <Button color="white" active={this.dailyActive()} onClick={this.dailyClicked}>Daily</Button>
            <Button color="white" active={this.weeklyActive()} onClick={this.weeklyClicked}>Weekly</Button>
          </Col>
        </Row>

        <Row style={{paddingTop: '1em'}} className='blackBackground body_div'>
          <Col sm='2' md='2'/>
          <Col sm='8' md='8'>
            {this.isVisible() ?
              <Table dark className='z-depth-5'>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Stock</th>
                  <th>Symbol</th>
                  <th>Shares Purchased</th>
                </tr>
                </thead>
                <tbody>
                {this.state.topTen.map((ticker, key) => {
                  return (<tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <th>{ticker.company}</th>
                    <th>{ticker.symbol}</th>
                    {this.dailyActive() ?
                      <th>{ticker.dailyBuyCount}</th>
                      :
                      <th>{ticker.weeklyBuyCount}</th>
                    }
                  </tr>)
                })}
                </tbody>
              </Table>
              :
              <Row>
                <Col sm='4' md='4'/>
                <Col sm='4' md='4'>
                  <h4 style={{color: 'whitesmoke'}}>Fetching Stock Data...</h4>
                </Col>
              </Row>
            }
          </Col>
        </Row>

      </div>
    )
  }

}

export default Trending;