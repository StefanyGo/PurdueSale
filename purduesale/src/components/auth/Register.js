import './Login.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {app} from '../../base';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        
        this.authenticate = this.authenticate.bind(this)
    }
	
	redirectWelcome = () => {
		this.props.history.push('/')
	}
	
	redirectRegister = () => {
		this.props.history.push('/signup')
	}
	
	redirectHome = () => {
		this.props.history.push('/home')
	}


    authenticate(e) {
        e.preventDefault();

            const email = this.emailInput.value;
            const password = this.passwordInput.value;

            app.auth().fetchSignInMethodsForEmail(email)
            .then((method) =>  {
                if (method.length === 0) {
                    // no user, create one
                    return app.auth().createUserWithEmailAndPassword(email,password);
                } else {
                    // user already exists
                    // sign in
                }
            }).then((user) => {
                if (user && user.email) {
                    this.loginForm.reset();
                    this.setState({redirect: true})
                }
            })
            .catch((error) => {
                console.log("uhoh!");
            });

        console.log("in authenticate()!");
    }

    render() {
        if (this.state.redirect === true ){
            return <Redirect to='/'/>
        }

        return (
			<div align="center">
			  <button class="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={(e) => this.authenticate(e) } ref={(form) => { this.loginForm = form }}>   
			    <div class="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Login</h2>
			      <label for="email"><b>Purdue Email</b></label>
			      <input id="email_blank" type="text" placeholder="Enter Email" name="email" required="" pattern="@purdue.edu\b" title="user must provide a valid @purdue.edu email" ref={(input) => {this.emailInput = input}}/>
			      <br/><br/>
			      <label for="pass"><b>Password</b></label>
			      <input id="password_blank" type="password" placeholder="Enter Password" name="pass" pattern="[a-zA-Z0-9_-]{6,12}" title="password must include 6-12 letters, uppercase, and a number." required="" ref={(input) => {this.passwordInput = input}}/>
			      <br/><br/>
                  <label for="pass"><b>Confirm Password</b></label>
			      <input id="password_blank" type="password" placeholder="Enter Password" name="confirm pass" pattern="[a-zA-Z0-9_-]{6,12}" title="password must include 6-12 letters, uppercase, and a number." required="" ref={(input) => {this.passwordInput = input}}/>
			      <br/><br/>
			      <button class="cancelbtn" onClick={this.redirectWelcome}>Cancel</button>
			      <button type="submit">Login</button>
			      <div align="right"><span class="password"><a href="resetpassword">Forgot password?</a></span></div>
			      <br/><br/>
			      <button class="registerbtn" onClick={this.redirectRegister}>Register New Account</button>
			    </div>
			  </form>
			</div>

        )
    }
}

export default Register;