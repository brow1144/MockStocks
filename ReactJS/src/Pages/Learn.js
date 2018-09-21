import React, {Component} from 'react';

import { Row, Col } from 'reactstrap';
import NavBar from '../Components/NavBar';

class Learn extends Component {

  constructor(props){
    super(props);

    this.state = {
      uid: localStorage.getItem('uid')
    };

  }

  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar/>
        </div>

        <div className='z-depth-5'>
          <Row style={{paddingTop: '10em'}} className='blackBackground body_div'>
            <Col sm='3' md='4'/>
            <Col sm='6' md='4'>
              <h3 style={{color: 'whitesmoke', textAlign: 'center'}}>Welcome to Portfol.io Learn!</h3>
            </Col>
          </Row>
        </div>

        <Row  style={{paddingTop: '10em'}} className='blackBackground body_div'>
          <Col sm='1' md='1'/>
          <Col sm='4' md='4'>
            <h4 style={{color: 'whitesmoke', textAlign: 'center'}}>Using Portfol.io</h4>
          </Col>
          <Col sm='2' md='2'/>
          <Col sm='4' md='4'>
            <h4 style={{color: 'whitesmoke', textAlign: 'center'}}>Investing Basics</h4>
          </Col>
          <Col sm='1' md='1'/>
        </Row>

      </div>
    )
  }

}

export default Learn;