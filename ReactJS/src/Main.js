import React, {Component} from 'react'

import NavBar from './Components/NavBar'

class Main extends Component {
  
  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar />     
        </div>  

        <this.props.component stock={this.props.stock}/>
      </div>
    );
  }
}

export default Main;