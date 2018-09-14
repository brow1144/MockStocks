import React, {Component} from 'react';
import '../Static/CSS/CreateUser.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';
import NavBar from '../Components/NavBar'
import '../Static/CSS/Home.css'

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
          <Col md='2'/>
          <Col md='3'>
            <h5 style={{color: 'whitesmoke'}}>Leaderboard</h5>
          </Col>
          <Col md='1'/>
          <Col md='3'>
            <h5 style={{color: 'whitesmoke'}}>My Stocks</h5>
          </Col>
          <Col md='2'>
            <h5 style={{color: 'whitesmoke'}}>Active Games</h5>
          </Col>
          <Col md='1'/>
        </Row>
      </div>
    );
  }
}

export default Games;