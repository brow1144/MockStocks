import React, {Component} from 'react'

import '../Static/CSS/SearchResult.css'

class SearchResult extends Component {

  render() { 

    return (
      <div>
        <p className='symbol'>{this.props.symbol}</p>
        <p className='company'>{this.props.company}</p>
      </div>
    );
  }
}

export default SearchResult;