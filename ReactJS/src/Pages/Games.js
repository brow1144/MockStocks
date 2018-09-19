import React, {Component} from 'react';
import '../Static/CSS/CreateUser.css';

//import {Input, Button} from 'mdbreact';
import { Row, Col } from 'reactstrap';
import NavBar from '../Components/NavBar';
import MyStocks from '../Components/Games/MyStocks';
import Leaderboard from '../Components/Games/Leaderboard';
import CreateGame from '../Components/Games/CreateGame'
import '../Static/CSS/Games.css';

class Games extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Array of user objects for the leaderboard
      users: [{}],
      // Array of stocks for the stock list
      myStocks: [{}],
      // Array of current games
      myFloors: [{}],
      money: 0,
      floorCode: "",
      floorName: "xxN0Sc0p35xx",
    };
  }

  /**
   *
   * Retrieve users for leaderboard and info about the current user
   *
   */

  componentWillMount () {

  };



  render() {


    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar/>
        </div>
        <Row style={{paddingTop: '9em'}} className='blackBackground body_div'>
          <Col md="4"/>
          <Col md="5">
            <h5 className={"gamesText "}>Floor Name : {this.state.floorName}</h5>
          </Col>
        </Row>
        <Row style={{paddingTop: '2em'}} className='blackBackground body_div'>
          <Col md="9">
            <Row>
              <Col md="1"/>
              <Col md="2">
                <h5 className={"gamesText"}>Floor Code : {this.state.floorCode}</h5>
              </Col>
              <Col md="6"/>
              <Col md="3">
                <h5 className={"gamesText"}>Spending Money : ${this.state.money}</h5>
              </Col>
            </Row>
            <Row  style={{paddingTop: '4em'}} className='blackBackground body_div'>
              <Col md='1'/>
              <Col md='5'>
                <Leaderboard/>
              </Col>
              <Col md='1'/>
              <Col md='5'>
                <MyStocks/>
              </Col>
            </Row>
          </Col>
          <Col md="3">
            <Row>
              <Col md='1'/>
              <Col md='11'>
                <h5 className={"gamesText"}>Active Games</h5>
                <CreateGame/>
              </Col>

            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Games;