import React, {Component} from 'react'
import { Table } from 'reactstrap'

class MyStocks extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='z-depth-5' >
        <h5 style={{color: 'whitesmoke'}}>My Stocks</h5>
        <Table className={"cenText"} dark hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Stock</th>
            <th>Symbol</th>
            <th>Value</th>
            <th>Owned</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Apple</td>
            <td>AAPL</td>
            <td>$110.10</td>
            <td>3</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Apple</td>
            <td>AAPL</td>
            <td>$110.10</td>
            <td>3</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Apple</td>
            <td>AAPL</td>
            <td>$110.10</td>
            <td>3</td>
          </tr>
          </tbody>
          <tbody>
          <tr>
            <th>Total </th>
            <th> </th>
            <th> </th>
            <th>$330.30</th>
            <th>9</th>
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MyStocks;