import React, {Component} from 'react';
import '../Static/CSS/CreateUser.css';

//import {Input, Button} from 'mdbreact';
import { Row, Col } from 'reactstrap';
import NavBar from '../Components/NavBar';
import MyStocks from '../Components/Games/MyStocks';
import Leaderboard from '../Components/Games/Leaderboard';
import CreateGame from '../Components/Games/CreateGame'
import '../Static/CSS/Home.css';

class Games extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //Hides message when opening create user | object | ex. error message
      visible: false,
      message: '',
    };
  }

  /**
   *
   * dismisses alert
   *
   * @param ev: |event| Ex: {click}
   *
   */

  onDismiss = () => {
    this.setState({ visible: false });
  };



  render() {


    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar/>
        </div>
        <Row style={{paddingTop: '7em'}} className='blackBackground body_div'>
          <Col md='1'/>
          <Col md='3'>
            <Leaderboard/>
          </Col>
          <Col md='1'/>
          <Col md='3'>
            <MyStocks/>
          </Col>
          <Col md='1'/>
          <Col md='2'>
            <h5 style={{color: 'whitesmoke'}}>Active Games</h5>
            <CreateGame/>
          </Col>
          <Col md='1'/>
        </Row>
      </div>
    );
  }
}

export default Games;