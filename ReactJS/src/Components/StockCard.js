import React, {Component} from 'react'

import '../Static/CSS/StockCard.css'

class StockCard extends Component {

  render() { 

    return (
      <div>
        <p className='inline'>{this.props.stockTicker}</p>
        <p className='inline percentage'>{this.props.stockChange}</p>
        <p className='inline percentage'>${this.props.close}</p>
      </div>
    );
  }
}

export default StockCard;