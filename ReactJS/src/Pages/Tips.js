import React, {Component} from 'react';

import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'mdbreact'

class Tips extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: localStorage.getItem('uid')
    };

  }

  render() {
    return (
      <div>
        {/* <div className='navbar-fixed'>
          <NavBar/>
        </div> */}

        <div className='z-depth-5'>
          <Row style={{paddingTop: '10em'}} className='blackBackground body_div'>
            <Col sm='3' md='4'/>
            <Col sm='6' md='4'>
                <h1 style={{color: 'whitesmoke', textAlign: 'center'}}>Tips and Tricks</h1>
            </Col>
          </Row>
        </div>

          <Row  style={{paddingTop: '3em'}} className='blackBackground body_div'>
            <Col sm='1' md='1'/>
            <Col sm='4' md='4'>
              <Card style={{backgroundColor: '#1B1B1D', color: 'whitesmoke'}}>
                <CardBody>
                  <CardTitle stlyle={{borderBottom: '2px solid whitesmoke'}} >
                    <p style={{color: 'whitesmoke', textAlign: 'center'}}>Investing Basics</p>
                  </CardTitle>
                  <hr className='hr'/>
                  <h5 style={{color: 'whitesmoke', textAlign: 'left'}}><b>Rule 1: Diversification!</b> Don't put all your eggs in one basket. Invest in numerous companies to reduce the risk of losing your money if one stock tanks!</h5>
                  <hr className='hr'/>
                  <h5 style={{color: 'whitesmoke', textAlign: 'left'}}><b>Dollar-Cost Averaging: </b> Don't invest all your money at once! Spread it out over a period of time to reduce the chance you buy at the wrong time. </h5>
                  <hr className='hr'/>
                  <h5 style={{color: 'whitesmoke', textAlign: 'left'}}><b>Long-Term Investments: </b> Find stocks with low volatility if you plan on keeping your money in for a long time. You should be looking for a graph that is consistently upwards, no matter how gentle the slope. </h5>
                  <hr className='hr'/>
                  <h5 style={{color: 'whitesmoke', textAlign: 'left'}}><b>Recognizing Patterns: </b> For day-trading and short-term investments, find predictable patterns in volatile stocks. Predict when the stock will rise, and buy just before! </h5>
                  <hr className='hr'/>
                  <h5 style={{color: 'whitesmoke', textAlign: 'left'}}>And finally of course: <b>Buy Low Sell High!</b></h5>
                </CardBody>
              </Card>
            </Col>
          <Col sm='2' md='2'/>
          <Col sm='4' md='4'>
            <Card style={{backgroundColor: '#1B1B1D', color: 'whitesmoke'}}>
              <CardBody>
                <CardTitle stlyle={{borderBottom: '2px solid whitesmoke'}} >
                  <p style={{color: 'whitesmoke', textAlign: 'center'}}>Using Portfol.io</p>
                </CardTitle>
                <hr className='hr'/>
                <h5 style={{color: 'whitesmoke', textAlign: 'center'}}><b>Purchasing Stock:</b> Use the search bar at the top of the screen to search for stocks by ticker or company name. Click one to be taken to a page where you can buy, sell, and look at price trends per share for that company!</h5>
                <hr className='hr'/>
                <h5 style={{color: 'whitesmoke', textAlign: 'center'}}><b>Trending Stocks:</b> View recent popular stocks by navigating to the Trending tab. From here you can view frequently purchased stocks, add them to your watchlist, and buy and sell them!</h5>
                <hr className='hr'/>
                <h5 style={{color: 'whitesmoke', textAlign: 'center'}}><b>Keep an Updated Watchlist:</b> Found a stock you think is interesting but need more time before buying? Add it to your watchlist so you can be kept up-to-date and find the best time to invest!</h5>
                <hr className='hr'/>
                <h5 style={{color: 'whitesmoke', textAlign: 'center'}}><b>Starting a New Investment Game:</b> Navigate to the Games page and click the Create New Game button. From here you will be able to invite friends to join you, change game settings, and set the time limit.</h5>
                <hr className='hr'/>
                <h5 style={{color: 'whitesmoke', textAlign: 'center'}}><b>Managing an Investment Game:</b> After creating a new game, you can set the time limit between weeks and months as well as setting players' stock visibilty. For more competitve games, disallow player's from seeing where others are investing by flipping the visibility toggle in game settings.</h5>
              </CardBody>
            </Card>
          </Col>
          <Col sm='1' md='1'/>
        </Row>

      </div>
    )
  }

}

export default Tips;