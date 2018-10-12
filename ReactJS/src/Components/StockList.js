import React, {Component} from 'react'
import { Card, CardBody, CardTitle } from 'mdbreact'

import StockCard from '../Components/StockCard'

import '../Static/CSS/StockList.css'

class StockList extends Component {


  render() { 
    return (
      <div style={{position: 'fixed', width: 'inherit',maxWidth: 'inherit'}} className='z-depth-5' >
        <Card style={{backgroundColor: '#1B1B1D', color: 'whitesmoke'}}>
          <CardBody>
              <div className="article-container-inner">
                <CardTitle stlyle={{borderBottom: '2px solid whitesmoke'}} >Watchlist</CardTitle>

              </div>

            {this.props.watchlist.map((stock, key) => {
              return (
                <div>
                  <hr className='hr'/>
                  {stock.changePercent >= 0
                    ?<StockCard stockTicker={stock.symbol}
                               stockChange={'+' + parseFloat(stock.changePercent).toFixed(2)}/>
                    :<StockCard stockTicker={stock.symbol}
                                stockChange={parseFloat(stock.changePercent).toFixed(2)}/>
                  }
                </div>
              )
            })}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default StockList;

/* All of this for loading user stocklist
{this.props.watchlist.map((stock, key) => {
  return (
    <div>
      <StockCard stockTicker={stock.symbol} stockChange={stock.changePercent}/>
    </div>
  )
})}
*/