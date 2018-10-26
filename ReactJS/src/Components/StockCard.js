import React, {Component} from 'react'
import {Link} from 'react-router-dom';

import '../Static/CSS/StockCard.css'

class StockCard extends Component {

  render() { 

    return (
      <div>
        <p className='inline'><Link to={`/Portfolio/Stocks/${this.props.stockTicker}`} style={{textDecoration: 'none', color: 'whitesmoke'}}>{this.props.stockTicker}</Link></p>
        <p style={{color: this.props.stockColor}} className='inline percentage'>{this.props.stockChange}</p>
        <p className='inline percentage'>${this.props.close}</p>
      </div>
    );
  }
}

export default StockCard;