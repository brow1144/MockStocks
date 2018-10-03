import React, {Component} from 'react'
import { Card } from 'mdbreact'

import Buy from './Buy';
import Sell from './Sell';

import '../Static/CSS/StockList.css'
import '../Static/CSS/BuySellCard.css'

class BuySellCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cost: 0,
      finalPrice: 0,
      selected: 'buy',
    }
  }

  updateCost = (ev) => {
    if (ev.target.value < 0) {
      this.setState({cost: 0, finalPrice: 0})
    } else {
      this.setState({
        finalPrice: Number(parseFloat((ev.target.value * this.props.currentPrice * 100) / 100).toFixed(2)).toLocaleString('en'),
        cost: ev.target.value
      });
    }
  }

  handleBuy = () => {
    this.setState({selected: 'buy'})    
  }

  handleSell = () => {
    this.setState({selected: 'sell'})
  }

  render() { 
    return (

      <div>

        <div style={{position: 'fixed', width: 'inherit', maxWidth: 'inherit'}} className='z-depth-5'>
          <Card style={{backgroundColor: '#1B1B1D', color: 'whitesmoke'}}>

            <div style={{textAlign: 'center'}}>
              <br/>

              <b onClick={this.handleBuy} className={`buy buyOrSell ${this.state.selected === 'buy' ? 'current' : ''}`}>Buy</b>
              <b onClick={this.handleSell} className={`sell buyOrSell ${this.state.selected === 'sell' ? 'current' : ''}`}>Sell</b>
            </div>

            <hr className='hr'/>

            {this.state.selected === 'buy' 
              ?
                <Buy currentPriceFor={this.props.currentPriceFor} updateCost={this.updateCost} cost={this.state.cost} finalPrice={this.state.finalPrice}/>
              :
                <Sell currentPriceFor={this.props.currentPriceFor} updateCost={this.updateCost} cost={this.state.cost} finalPrice={this.state.finalPrice}/>
            } 

          </Card>
        </div>

      </div>
    );
  }
}

export default BuySellCard