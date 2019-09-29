import React, { Component } from 'react'
import Link from 'react-router-dom'
class Login extends Component {
    render() {
        return (
            <div>

               {this.props.authenticated
               ? <a> you're logged in!!! </a>
               : <input className="pt-input" placeholder="Type your email..." type="email"/>
            
            }

            </div>

        )
    }
}

export default Login;