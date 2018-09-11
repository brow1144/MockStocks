import React, {Component} from 'react';

import {FormInline, Fa} from 'mdbreact';
import {Row, Col} from 'reactstrap';

import '../Static/CSS/NavBar.css';

class NavBar extends Component {
  render() {

    return (
      <div>
        <Row>
          <Col className='title' sm='2'>
            <b>Portfol.io</b>
          </Col>
          <Col className='blackBack' sm='6'>
            <FormInline className="md-form">
              <Fa style={{color: 'whitesmoke'}} icon="search" />
              <input style={{color: 'whitesmoke'}} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
            </FormInline>
          </Col>
          <Col className='navText' sm='2'>
            <b>Home</b>
          </Col>
          <Col className='navText' sm='2'>
            <b>Games</b>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NavBar;