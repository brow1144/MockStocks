import React, {Component} from 'react';

import SearchResult from '../Components/SearchResult';

import {FormInline, Fa} from 'mdbreact'
import {Row, Col} from 'reactstrap';

import { NavLink } from 'react-router-dom';

import axios from 'axios'

import { fireauth } from '../base';

import '../Static/CSS/NavBar.css';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tickers: [],
      tickersShowing: [],
      search: '',
    }
  }

  componentWillMount() {
    let self = this
    axios.get(`https://portfolio-408-main.herokuapp.com/Portfol.io/GetTickers`)
      .then(function (response) {
        // handle success
        self.setState({tickers: response.data.tickers});
      })
      .catch(function (error) {
        // handle error
        console.log(`Oh no! Our Ticker API didn't respond. Please refresh and try again`)
        console.log(`Btw here is the error message\n\n`)

        if (error.response && error.response.data)
          console.log(error.response.data.error);
        else
          console.log(error);
    })
  }

  findTickers = (ev) => {
    let search = ev.target.value;
    if (search === '') { this.setState({tickersShowing: [], search: ''}); return;}
    let ans = [];
    let counter = 0;

    for (let stock in this.state.tickers) {
      let ticker = this.state.tickers[stock]['symbol'];
      let company = this.state.tickers[stock]['company'];
      if (ticker.includes(search.toUpperCase())) { ans.push({ticker: ticker, company: company}); counter++; }
      if (counter > 5) break;
    }

    this.setState({
      tickersShowing: ans,
      search: ev.target.value,
    })
  }

  /**
   * Reload the page
   */
  reloadPage = () => {
    window.location.reload();
  }

  clearSearch = () => {
    this.setState({tickersShowing: []})
  }

  firebaseOut = () => {
    fireauth.signOut().then(() => {
      console.log("User Signed out")
    })
  };

  handleSignOut = () => {
    localStorage.removeItem('uid');
    sessionStorage.removeItem('uid');
    this.setState({uid: null});
    this.firebaseOut();
    window.location.reload();
  };

  render() {

    const stocks = this.state.tickersShowing.map((stock) =>
      <SearchResult
        search={this.state.search}
        clearSearch={this.clearSearch}
        key={stock.ticker}
        symbol={stock.ticker}
        company={stock.company}
      />
    );

    return (
      <Row style={{backgroundColor: '#1B1B1D'}}>
        <Col className='title' sm='2'>
          <NavLink to={'/Portfolio/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Portfol.io</b>
          </NavLink>
        </Col>
        <Col style={{marginTop: '0.6em'}} className='blackBack' sm='4'>
          <div style={{marginBottom: '-20em'}} className='z-depth-5 blackBack'>
            <FormInline className="md-form">
              <Fa style={{color: 'whitesmoke'}} icon="search" />
              <input id='search' value={this.state.search} onChange={this.findTickers} style={{zoom: '80%', color: 'whitesmoke'}} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
            </FormInline>

          {stocks}

          </div>
        </Col>
        {this.props.currentGame !== null && this.props.currentGame !== undefined && this.props.currentGame !== {}
          ?
          <Col className='navText' sm='1' md='1'>
            <NavLink to={'/Portfolio/Games'} style={{textDecoration: 'none'}}>
              <b className='navText' style={{fontSize: '1em'}}>Current Floor: {this.props.currentGame.game_name} ({this.props.currentGame.code})</b>
            </NavLink>
          </Col>
          :
          null
        }
        
        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/Portfolio/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Home</b>
          </NavLink>
        </Col>
        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/Portfolio/Trending'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Trending</b>
          </NavLink>
        </Col>
        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/Portfolio/Games'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Games</b>
          </NavLink>
        </Col>
        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/Portfolio/Tips'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Tips</b>
          </NavLink>
        </Col>
        <Col className='navText' sm='1' md='1'>
          <NavLink onClick={this.handleSignOut} to={'/Portfolio'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>Sign Out</b>
          </NavLink>
        </Col>
        <Col className='blackBack' sm='1' />
      </Row>
    );
  }
}

export default NavBar;
