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
        console.log(topTen);
        self.setState({topTen: topTen});
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

  render() {
    return (
      <div>

        <Row  style={{paddingTop: '10em'}} className='blackBackground body_div'>
          <Col sm='2' md='2'/>
          <Col sm='8' md='8'>
            <h5 style={{color: 'whitesmoke'}}>Trending Stocks</h5>
            <Table dark>
              <thead>
              <tr>
                <th>#</th>
                <th>Stock</th>
                <th>Symbol</th>
                <th>Value</th>
                <th>Shares Purchased Today</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Apple</td>
                <td>AAPL</td>
                <td>$110.10</td>
                <td>21</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Apple</td>
                <td>AAPL</td>
                <td>$110.10</td>
                <td>16</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Apple</td>
                <td>AAPL</td>
                <td>$110.10</td>
                <td>9</td>
              </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

      </div>
    )
  }

}

export default Trending;