import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css';

import Login from './components/auth/Login.js';
import Logout from './components/auth/Logout.js';

import Navbar from './components/navbar/Navbar';
import SignUp from './components/auth/Signup';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      currentUser: null,
    };
 
  }

render() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
