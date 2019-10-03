import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css';

import Navbar from './components/navbar/Navbar';
import Login from './components/auth/Login.js';
import Logout from './components/auth/Logout.js';
import SignUp from './components/auth/Signup';
import Profile from './components/dashboard/Dashboard'
import ForgotPass from './components/auth/ForgotPass';
import ResetPassword from './components/auth/ResetPassword';

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
          <Route path='/profile' component={Profile} />
          <Route path='/forgotpass' component={ForgotPass} />
          <Route path='/resetpass' component={ResetPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
