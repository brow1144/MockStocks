import React, {Component} from 'react'

import NavBar from './Components/NavBar'
import Home from './Pages/Home'

class Main extends Component {
  
  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar />     
        </div>  

        <Home/>
      </div>
    );
  }
}

export default Main;