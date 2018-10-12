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
            <th>Symbol</th>
            <th>Current Value</th>
            <th>Owned</th>
            <th>Total Value</th>
          </tr>
          </thead>
          <tbody>
          {this.props.currentUserStocks.stocksArray
            ?
            this.props.currentUserStocks.stocksArray.map((stock, key) => {
              return (<tr key={key}>
                <th scope="row">{key + 1}</th>
                <th>{stock.symbol}</th>
                <th>{stock.price.toLocaleString()}</th>
                <th>{stock.quantity}</th>
                <th>{stock.total.toLocaleString()}</th>
              </tr>)
            })
            :
            <tr/>
          }
          </tbody>
          <tbody>
          <tr>
            <th>Total</th>
            <th/>
            <th/>
            <th>{this.props.currentUserStocks.totalOwned}</th>
            {this.props.currentUserStocks.totalAssets
              ?
              <th>${this.props.currentUserStocks.totalAssets.toLocaleString()}</th>
              :
              <th/>
            }
          </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MyStocks;