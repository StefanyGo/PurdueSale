import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {app} from './base';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        
        this.authenticate = this.authenticate.bind(this)
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

                    return app.auth().signInWithEmailAndPassword(email,password);

                    this.loginForm.reset();
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
            <div>
                <form onSubmit={(e) => this.authenticate(e) } ref={(form) => { this.loginForm = form }}>               
                 <div> 
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
            </form>
            </div>

        )
    }
}

export default Login;