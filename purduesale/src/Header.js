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
          <div className="pt-navbar-heading">Purdue Sale</div>
          {this.props.authenticated
              ? <a> hi! </a>
              : null
          }
        </div>
      </nav>
    );
  }
}

export default Header;