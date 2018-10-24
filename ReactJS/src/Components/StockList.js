import React, {Component} from 'react'
import { Card, CardBody, CardTitle } from 'mdbreact'
import { NavLink, BrowserRouter} from 'react-router-dom';

import StockCard from '../Components/StockCard'

import '../Static/CSS/StockList.css'

class StockList extends Component {

  componentWillMount(){
    this.getTopRisers();
  }

  getTopRisers(){
    let watchlist = this.props.watchlist;
    watchlist.sort(this.sortByChange());
    return watchlist.slice(0,5);
  }

  sortByChange() {
    return function (a, b){
      return b.changePercent - a.changePercent;
    }
  }
  render() {
    return (
      <div style={{position: 'fixed', width: 'inherit',maxWidth: 'inherit'}} className='z-depth-5' >
        <Card style={{backgroundColor: '#1B1B1D', color: 'whitesmoke'}}>
          <CardBody>
              <div className="article-container-inner">
                <CardTitle stlyle={{borderBottom: '2px solid whitesmoke'}} >Watchlist Top Risers</CardTitle>

              </div>
            {this.getTopRisers().map((stock, key) => {
              return (
                <div key={key}>
                  <hr className='hr'/>
                  {stock.changePercent >= 0
                    ?<StockCard stockColor='green' close={stock.close} stockTicker={stock.symbol} stockChange={'+' + parseFloat(stock.changePercent).toFixed(4) + "%"}/>
                    :<StockCard stockColor='red' close={stock.close} stockTicker={stock.symbol} stockChange={parseFloat(stock.changePercent).toFixed(4) + "%"}/>
                  }
                </div>
              )
            })}
            <hr className='hr'/>
            <BrowserRouter>
              <NavLink to={'/Portfolio/Watchlist'} style={{textDecoration: 'none'}}>
                <b className='navText' style={{fontSize: '1em'}}>View Full Watchlist</b>
              </NavLink>
            </BrowserRouter>
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