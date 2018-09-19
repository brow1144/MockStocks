import React, {Component} from 'react'

import { NavLink } from 'react-router-dom';

import '../Static/CSS/SearchResult.css'

class SearchResult extends Component {

  render() { 

    return (
      <div className='searchHover'>
        <NavLink to={`/Portfol.io/Stocks/${this.props.symbol}`} onClick={this.props.clearSearch} style={{textDecoration: 'none'}}>
          <p className='symbol'>{this.props.symbol}</p>
          <p className='company'>{this.props.company}</p>
        </NavLink>
      </div> 
    );
  }
}

export default SearchResult;