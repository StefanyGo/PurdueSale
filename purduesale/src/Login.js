import React, { Component } from 'react'
//import Link from 'react-router-dom'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
        }
        this.authenticate = this.authenticate.bind(this)
    }

    authenticate(e) {
        e.preventDefault();
        console.table([{
            email:this.emailInput.value,
            password: this.passwordInput.value,
        }])

        console.log("hey!");
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.authenticate(e) } ref={(form) => { this.loginForm = form }}>               {
                   this.props.authenticated
               ? (<p> you're logged in!!! </p>)
               : ( <div> 
                   <label className="pt-label">
                    Email
                    <br/>
                    <input className="pt-input" name="email" placeholder="Type your email..." type="email" ref={(input) => {this.emailInput = input}}/>
                    </label>
                    <br/>
                    <label className="pt-label">
                    Password
                    <br/>
                    <input className="pt-input" name="password" placeholder="Type your password..." type="password" ref={(input) => {this.passwordInput = input}}/>
                    </label>
                    <br/>
                    <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>  
               </div>
               )
            }
            </form>
            </div>

        )
    }
}

export default Login;