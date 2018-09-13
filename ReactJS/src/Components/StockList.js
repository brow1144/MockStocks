import React, {Component} from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact'

import StockCard from '../Components/StockCard'

import '../Static/CSS/StockList.css'

class StockList extends Component {

  render() { 
    return (
      <div style={{position: 'fixed', width: 'inherit',maxWidth: 'inherit'}} className='z-depth-5' >
        <Card style={{backgroundColor: '#1B1B1D', color: 'whitesmoke'}}>
          <CardBody>
              <div class="article-container-inner">
                <CardTitle stlyle={{borderBottom: '2px solid whitesmoke'}} >Watchlist</CardTitle>
                <hr className='hr'/>
              </div>

              <StockCard stockTicker={'AAPL'} stockChange={'+0.68%'}/> <hr className='hr'/>
              <StockCard stockTicker={'MSFT'} stockChange={'-0.15%'}/> <hr className='hr'/>
              <StockCard stockTicker={'DVMT'} stockChange={'+2.58%'}/> <hr className='hr'/>
              <StockCard stockTicker={'VMW'} stockChange={'+0.94%'}/>  <hr className='hr'/>
              <StockCard stockTicker={'PVTL'} stockChange={'+0.69%'}/> 
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default StockList;