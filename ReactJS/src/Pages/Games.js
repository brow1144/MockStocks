import React, {Component} from 'react';
import '../Static/CSS/CreateUser.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';
import NavBar from '../Components/NavBar'

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
        <Row style={{marginBottom: '1000em'}} className='blackBackground body_div'>
          <Col md='1'/>

          <Col md='1'/>


          <Col md='1'/>
        </Row>
      </div>
    );
  }
}

export default Games;