import React, {Component} from 'react';

import { Row, Col } from 'reactstrap';
import NavBar from '../Components/NavBar';
import { Table } from 'reactstrap'

class Trending extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: localStorage.getItem('uid')
    };

  }

  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar/>
        </div>

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