import React, {Component} from 'react'

import SignIn from './Pages/SignIn'
import CreateUser from './Pages/CreateUser'
import Main from './Main'
import Games from './Pages/Games'

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
    // this.getUserFromsessionStorage();
    let self = this;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          self.setState({user: user, uid: user['m']})
          // self.authHandler(user)
        } else {
          // finished signing out
          self.setState({uid: null, user: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  // getUserFromsessionStorage() {
  //   const uid = sessionStorage.getItem('uid');
  //   if (!uid) return;
  //   this.setState({uid})
  // }

  // authHandler = (user) => {
  //   sessionStorage.setItem('uid', user.uid);
  //   this.setState({uid: user.uid, user: user})
  // };

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

        <Route path='/Portfol.io/Home' render={() => (
          this.signedIn()
            ? <Main />
            : <Redirect to={`/Portfol.io/SignIn`}/>
        )}/>

        <Route path='/Portfol.io/Games' render={() => (
          this.signedIn()
            ? <Games />
            : <Redirect to={`/Portfol.io/SignIn`}/>
        )}/>

        <Route path='/Portfol.io/SignIn' render={() => (
          !this.signedIn()
            ? <SignIn/>
            : <Redirect to={`/Portfol.io/Home`}/>
        )}/>

        <Route path='/Portfol.io/CreateAccount' render={() => (
          !this.signedIn()
            ? <CreateUser/>
            : <Redirect to={`/Portfol.io/Home`}/>
        )}/>

        <Route render={() => {
          return (
            <Redirect to={`/Portfol.io/Home`} />
          )
        }}/>

      </Switch>
    );
  }
}

export default App;