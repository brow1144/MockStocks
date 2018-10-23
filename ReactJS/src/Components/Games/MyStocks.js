import React, {Component} from 'react'
import { Table, Button } from 'reactstrap'
import '../../Static/CSS/Games.css';
import { Link } from 'react-router-dom'

class MyStocks extends Component {

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    router: {}
  }

  switchPage = (symbol) => {
    this.context.router.push(`/Portfol.io/Stocks/${symbol}`);
  }

  render() {
    return (
      <div >
        <h5 style={{color: 'whitesmoke'}}>My Stocks</h5>
        {this.props.currentUserStocks.stocksArray
          ?
          <Table  className='z-depth-5 cenText' dark hover>
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
            {this.props.currentUserStocks.stocksArray.map((stock, key) => {
              return (
                  <tr key={key}>
                    <th scope="row"><Link to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{key + 1}</Link></th>
                    <th><Link to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{stock.symbol}</Link></th>
                    <th><Link to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>${parseFloat((stock.price).toFixed(2)).toLocaleString()}</Link></th>
                    <th><Link to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{stock.quantity}</Link></th>
                    <th><Link to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>${parseFloat((stock.total).toFixed(2)).toLocaleString()}</Link></th>
                  </tr>
              )
            })}
            </tbody>
            <tbody>
            <tr>
              <th>Total</th>
              <th/>
              <th/>
              <th>{this.props.currentUserStocks.totalOwned}</th>
              {this.props.currentUserStocks.totalAssets
                ?
                <th>${(parseFloat(((this.props.currentUserStocks.totalAssets).toFixed(2))) - this.props.currentUserStocks.buying_power).toLocaleString()}</th>
                :
                <th/>
              }
            </tr>
            </tbody>
          </Table>
          :
          <div>
            <br/>
            <p className={"gamesText"}>You currently have no stocks</p>
          </div>

        }
      </div>
    );
  }
}

export default MyStocks;