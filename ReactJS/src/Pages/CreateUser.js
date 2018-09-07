import React, {Component} from 'react';
import './CreateUser.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';

import {fireauth} from '../base';

class CreateUser extends Component {

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
     * Submits user information in create user form
     * 
     * @param ev: |event| Ex: {click}
     * 
     */

  onSubmit = (ev) => {
    ev.preventDefault();
    let target = ev.target;

    if ( target.firstName.value === ''
      || target.lastName.value === ''
      || target.email.value === ''
      || target.password.value === ''
      || target.confirmPassword.value === '') {

        this.setState({visible: true, message: 'Please fill out the entire form!'});
    } else {
      if (target.password.value !== target.confirmPassword.value)
        this.setState({visible: true, message: 'Passwords Don\'t Match!'});
      else {
        let self = this;
        //creates user with email and password
        fireauth.createUserWithEmailAndPassword(target.email.value, target.password.value)
          .then((userData) => {

          }).catch((error) => {
            // Handle error
              self.setState({visible: true, message: error.message});
          });
      }
    }

  };

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

  /**
     * 
     * Creates random ID for user in database
     * 
     * 
     */

  makeid = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
  }

  render() {
    return (
      <section className="container">
        <div className="left-half tall" />
        <div className="right-half tall">
          <article>
            <Row>
              <Col className='imgCol' sm='0' md='3'>
                <img className='logo' src={'https://upload.wikimedia.org/wikipedia/commons/7/7a/Dell_EMC_logo.svg'} alt="Dell EMC" />
              </Col>
              {/* <Col xs='0' md='1'/> */}
              <Col className='text' sm='12' md='7'>
                Lets Start by Signing Up!
              </Col>
            </Row>
            <br/>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col xs='12' md='6'>
                  <Input name='firstName' className='firstName' style={{fontSize: '0.85em'}} label="First Name"/>
                </Col>
                <Col xs='12' md='6'>
                  <Input name='lastName' className='lastName' style={{fontSize: '0.85em'}} label="Last Name"/>
                </Col>
              </Row>
              <Input name='email' style={{fontSize: '0.85em'}} label="Email"/>
              <Input name='password' label="Password" type="password"/>
              <Input name='confirmPassword' label="Confirm Password" type="password"/>
              <br/>
              <Button type='submit' className='signInButton' color="blue">Sign Up!</Button>
            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default CreateUser;