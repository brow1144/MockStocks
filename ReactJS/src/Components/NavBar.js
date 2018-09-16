import React, {Component} from 'react';

import {FormInline, Fa} from 'mdbreact'
import {Row, Col} from 'reactstrap';

import { NavLink } from 'react-router-dom';

import '../Static/CSS/NavBar.css';

class NavBar extends Component {
  render() {

    return (
      <Row style={{backgroundColor: '#1B1B1D'}}>
        <Col className='title' sm='2'>
          <NavLink to={'/Portfol.io/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Portfol.io</b>
          </NavLink>        
        </Col>
        <Col style={{marginTop: '0.6em'}} className='blackBack' sm='5'>
          <div className='z-depth-5 blackBack'>
            <FormInline className="md-form">
              <Fa style={{color: 'whitesmoke'}} icon="search" />
              <input style={{zoom: '80%', color: 'whitesmoke'}} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
            </FormInline>
          </div>
        </Col>
        <Col sm='2' />
        <Col className='navText' sm='1'>
        <NavLink to={'/Portfol.io/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Home</b>
          </NavLink>        
        </Col>
        <Col className='navText' sm='1'>
          <NavLink to={'/Portfol.io/Games'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Games</b>
          </NavLink>
        </Col>
        <Col className='blackBack' sm='1' />
      </Row>
    );
  }
}

export default NavBar;