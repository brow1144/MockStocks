import React, {Component} from 'react';

import { Row, Col } from 'reactstrap';
import { Table } from 'reactstrap'
import axios from "axios/index";

class Trending extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: localStorage.getItem('uid'),
      visible: false,
      topTen: null,

    };

  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    let self = this;
    // Cache Stuff Go here eventually
    axios.get(`http://localhost:8080/Portfol.io/Trending/day`)
      .then((response) => {
        // handle success
        let topTen = response.data;
        self.setState({
          topTen: topTen,
          visible: true
        });
      })
      .catch((error) => {
        // handle error
        console.log(`Oh no! Our API didn't respond. Please refresh and try again`);
        console.log(`Btw here is the error message\n\n`);

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
      })
  }

  render() {
    if(this.state.visible){
      return (
        <div>

          <Row  style={{paddingTop: '10em'}} className='blackBackground body_div'>
            <Col sm='2' md='2'/>
            <Col sm='8' md='8'>
              <h5 style={{color: 'whitesmoke'}}>Trending Stocks</h5>
              <Table dark className='z-depth-5'>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Stock</th>
                  <th>Symbol</th>
                  <th>Daily Shares Purchased</th>
                </tr>
                </thead>
                <tbody>
                {this.state.topTen.map((ticker, key) => {
                  return (<tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <th>{ticker.company}</th>
                    <th>{ticker.symbol}</th>
                    <th>{ticker.dailyBuyCount}</th>
                  </tr>)
                })}
                </tbody>
              </Table>
            </Col>
          </Row>

        </div>
      )
    }
    else {
      return "Loading";
    }
  }

}

export default Trending;