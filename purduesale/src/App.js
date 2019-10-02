import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './Login.js';
import {app} from './base';
import Logout from './Logout.js';
import Header from './Header.js'
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
    <div className="App">
    <BrowserRouter>
    <Header authenticated={this.state.authenticated} />
        { this.state.authenticated
        ? (<Route path="/logout" component={Logout} />

      )

        : (
        <Route path="/login" component={Login} />
        )

        }
        </BrowserRouter>
    </div>
  );
}
}

export default App;
