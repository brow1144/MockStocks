import React, {Component} from 'react'

import SignIn from './Pages/SignIn'
import CreateUser from './Pages/CreateUser'
import Main from './Main'
import Games from './Pages/Games'
import Trending from './Pages/Trending'
import Tips from './Pages/Tips'
import Home from './Pages/Home'
import StockPage from './Pages/StockPage'
import Watchlist from './Pages/Watchlist'

import firebase from './base'

import {Route, Switch, Redirect} from 'react-router-dom'

import './Static/CSS/App.css'
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {

  constructor() {
    super();

    this.state = {
      uid: null,
      user: null,
    }
  }

  componentWillMount() {
    this.getUserFromsessionStorage();
    let self = this;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          // self.setState({user: user, uid: user['m']})
          self.authHandler(user)
        } else {
          // finished signing out
          self.setState({uid: null, user: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  getUserFromsessionStorage() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) return;
    this.setState({uid})
  }

  authHandler = (user) => {
    sessionStorage.setItem('uid', user.uid);
    this.setState({uid: user.uid, user: user})
  };

  signedIn = () => {
    return this.state.uid
  };

  render() {
    const data = {
      user: this.state.user,
      uid: this.state.uid,
    }
  
    return (
      <Switch>

        <Route path='/Portfolio/Home' render={() => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={Home}/>
            : <Redirect to={`/Portfolio/SignIn`}/>
        )}/>

        <Route path='/Portfolio/Stocks/:stock' render={(match) => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={StockPage} stock={match.match.params.stock} />
            : <Redirect to={`/Portfolio/SignIn`}/>
        )}/>

        <Route path='/Portfolio/Trending' render={() => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={Trending}/>
            : <Redirect to={`/Portfolio/SignIn`}/>
        )}/>

        <Route path='/Portfolio/Tips' render={() => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={Tips}/>
            : <Redirect to={`/Portfolio/SignIn`}/>
        )}/>

        <Route path='/Portfolio/Games' render={() => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={Games}/>
            : <Redirect to={`/Portfolio/SignIn`}/>
        )}/>

        <Route path='/Portfolio/Watchlist' render={() => (
          this.signedIn()
            ? <Main uid={this.state.uid} component={Watchlist}/>
            : <Redirect to={`/Portfolio/SignIn`}/>
        )}/>

        <Route path='/Portfolio/SignIn' render={() => (
          !this.signedIn()
            ? <SignIn/>
            : <Redirect to={`/Portfolio/Home`}/>
        )}/>

        <Route path='/Portfolio/CreateAccount' render={() => (
          !this.signedIn()
            ? <CreateUser/>
            : <Redirect to={`/Portfolio/Home`}/>
        )}/>

        <Route render={() => {
          return (
            <Redirect to={`/Portfolio/Home`} />
          )
        }}/>

      </Switch>
    );
  }
}

export default App;