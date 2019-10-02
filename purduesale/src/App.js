import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import Route from 'react'
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import {app} from './base';
import Logout from './Logout';
class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,

    };
 
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({
                authenticated: true,
            })
        } else {
          this.setState({
            authenticated: false,
        })
        }
    }
    )}

    componentWillUnmount() {
      this.removeAuthListener();
    }

render() {
  return (
    <div className="App">
    <BrowserRouter>
      <header authenticated={this.state.authenticated}/>
        <img src={logo} className="App-logo" alt="logo" />
        { this.state.authenticated
        ? <Logout/>
        : (<Login/>)
        }
        <header/>
        </BrowserRouter>
    </div>
  );
}
}

export default App;
