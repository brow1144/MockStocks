import React, {Component} from 'react'
import { Row, Col, Card, CardBody, CardTitle, Button } from 'mdbreact'

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

            <CardBody>
              {/* <div className="article-container-inner">
                <CardTitle className='buyStock'>Buy {this.props.stock}</CardTitle>
                <hr className='hr'/>
              </div> */}
              
              <Row> 
                <Col sm='6'>
                  <h6 className='leftText'>Shares</h6>
                </Col>
                <Col sm='6'>
                  <input className="form-control form-control-sm" value={this.state.cost} onChange={this.updateCost} style={{color: 'whitesmoke', backgroundColor: '#1B1B1D'}} type="number" placeholder="#" />
                </Col>
              </Row>

              <br />

              <Row> 
                <Col sm='8'>
                  <h6 className='buySmallText' style={{color: '#009ddb', marginTop: '9px'}}>Market Price</h6>
                </Col>
                <Col sm='4'>
                  <p style={{marginTop: '7px', float: 'right', fontSize: '0.8em', color: 'whitesmoke'}}>${this.props.currentPriceFor}</p>
                </Col>
              </Row>
              
              <br />

              <Row> 
                <Col sm='6'>
                  <h6 className='leftText' style={{marginTop: '8px'}}>Cost</h6>
                </Col>
                <Col sm='6'>
                  <p id='finalCost' style={{marginTop: '7px', float: 'right', fontSize: '0.8em', color: 'whitesmoke'}}>${this.state.finalPrice}</p>
                </Col>
              </Row>

              <br />

              <Button color='blue' style={{margin: '0 auto', display: 'block', background: '#009ddb'}}>Submit Order</Button>

              <hr className='hr' />

              <p style={{textAlign: 'center', margin: '0 auto', display: 'block', fontSize: '0.8em', color: 'whitesmoke'}}>$6,000.23 Buying Power Available</p>

            </CardBody>
          </Card>
        </div>

      </div>
    );
  }
}

export default BuySellCard;