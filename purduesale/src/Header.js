import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          {this.props.authenticated
              ? (
                  <div>
                    <Link to="/logout">Logout</Link>
                </div>
              )
              : <div>
              <Link to="/login">Login</Link>
          </div>
          }
        </div>
      </nav>
    );
  }
}

export default Header;