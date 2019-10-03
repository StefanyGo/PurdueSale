import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import './App.css';
import {app} from './base';

import Login from './components/auth/Login.js';
import Logout from './components/auth/Logout.js';
import Register from './components/auth/Register.js';


import { Link } from 'react-router-dom'

import SignedInLinks from './components/navbar/SignedInLinks';
import SignedOutLinks from './components/navbar/SignedOutLinks';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      currentUser: null,
    };
 
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                authenticated: true,
                currentUser: user,
            })
        } else {
          this.setState({
            authenticated: false,
            currentUser: null,
        })
        }
    }
    )}

    componentWillUnmount() {
      this.removeAuthListener();
    }

render() {
  return (
    <BrowserRouter>
      <nav className="nav-wrapper.grey-darken-3">
        <div className="navbar-container">
          <Link to='/' className="brand-logo">PurdueSale</Link>
          { this.state.authenticated
          ? <SignedInLinks />
          : <SignedOutLinks />
          } 
        </div>
        </nav>
      <div className="App">
          { this.state.authenticated
          ? (<Route path="/logout" component={Logout} />)

          : (<Route path="/login" component={Login} /> )
          }
      </div>
    </BrowserRouter>
  );
}
}

export default App;
