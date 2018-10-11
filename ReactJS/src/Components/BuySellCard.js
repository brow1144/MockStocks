import React, {Component} from 'react'
import { Card, Modal, CardHeader, CardBody, CardTitle, CardText, Button } from 'mdbreact'

import Buy from './Buy';
import Sell from './Sell';
import axios from 'axios';

import '../Static/CSS/StockList.css'
import '../Static/CSS/BuySellCard.css'

class BuySellCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cost: 0,
      finalPrice: 0,
      selected: 'buy',
      modal: false,
      errorMessage: '',
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

  buyStock = () => {
    let self = this
    axios.put(`http://localhost:8080/Portfol.io/Games/Buy/${this.props.uid}/${this.props.currentGame.code}/${this.props.stock}/${this.state.cost}/${this.props.currentPrice}`)
    .then((data) => {

      let ActiveGame = data.data;
      self.setState({errorMessage: `You have succesfuly bought ${this.state.cost} shares of ${this.props.stock}!`, modal: true,})

    }).catch((err) => {
      self.setState({errorMessage: err.response.data.error.message, modal: true,})
    });

  }

  sellStock = () => {
    let self = this
    axios.put(`http://localhost:8080/Portfol.io/Games/Sell/${this.props.uid}/${this.props.currentGame.code}/${this.props.stock}/${this.state.cost}/${this.props.currentPrice}`)
    .then((data) => {

      let ActiveGame = data.data;
      self.setState({errorMessage: `You have succesfuly sold ${this.state.cost} shares of ${this.props.stock}!`, modal: true,})
    }).catch((err) => {
      self.setState({errorMessage: err.response.data.error.message, modal: true,})
    });
  }

  handleBuy = () => {
    this.setState({
      cost: 0,
      finalPrice: 0,
      selected: 'buy'
    })
  }

  handleSell = () => {
    this.setState({
      cost: 0,
      finalPrice: 0,
      selected: 'sell'
    })
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  }

  render() {
    return (

      <div>

        <Modal isOpen={this.state.modal} toggle={this.toggle} side position="top-right">
          <CardHeader color="info-color-dark lighten-1">Warning</CardHeader>
          <CardBody>
              {/* <CardTitle>Info Box</CardTitle> */}
              <CardText>{this.state.errorMessage}</CardText>
              <Button onClick={this.toggle} color="primary">Close</Button>{' '}
          </CardBody>
        </Modal> 


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
              <Buy gameData={this.props.gameData} buyStock={this.buyStock} currentPriceFor={this.props.currentPriceFor} updateCost={this.updateCost} cost={this.state.cost} finalPrice={this.state.finalPrice}/>
            :
              <Sell gameData={this.props.gameData} sellStock={this.sellStock} currentPriceFor={this.props.currentPriceFor} updateCost={this.updateCost} cost={this.state.cost} finalPrice={this.state.finalPrice}/>
            }

          </Card>
        </div>

      </div>
    );
  }
}

export default BuySellCard
