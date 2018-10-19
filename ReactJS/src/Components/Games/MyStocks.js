import React, {Component} from 'react'
import { Table } from 'reactstrap'
import '../../Static/CSS/Games.css';
import { NavLink } from 'react-router-dom'

class MyStocks extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * Sends the use to that stock's page
   */
  openStock = () => {
    //to=(`/Portfol.io/Stocks/${stock.symbol}`)
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
                  <tr onClick={() => this.openStock()} key={key}>
                    <th scope="row"><NavLink to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{key + 1}</NavLink></th>
                    <th><NavLink to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{stock.symbol}</NavLink></th>
                    <th><NavLink to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>${parseFloat((stock.price).toFixed(2)).toLocaleString()}</NavLink></th>
                    <th><NavLink to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{stock.quantity}</NavLink></th>
                    <th><NavLink to={`/Portfol.io/Stocks/${stock.symbol}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>${parseFloat((stock.total).toFixed(2)).toLocaleString()}</NavLink></th>
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