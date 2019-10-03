import './Login.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
    state = {
        firstname: '',
        lastname: '',
        password1: '',
        password2: '',
    }
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    
	redirectWelcome = () => {
		this.props.history.push('/')
	}
	
	redirectLogin = () => {
		this.props.history.push('/login')
	}
	
	redirectHome = () => {
		this.props.history.push('/home')
	}

    render() {
        return (
			<div align="center">
			  <button class="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Sign Up</h2>
			      <label htmlFor="firstname"><b>First Name</b></label>
			      <input id="firstname" type="text" placeholder="Enter First Name" name="firstname" required="" onChange={this.handleChange}/>
			      <br/><br/>
                  <label htmlFor="lastname"><b>Last Name</b></label>
			      <input id="lastname" type="text" placeholder="Enter Last Name" name="lastname" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <label htmlFor="pass"><b>New Password</b></label>
			      <input id="password1" type="password" placeholder="Enter New Password" name="pass1" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <label htmlFor="pass"><b>Retype Password</b></label>
			      <input id="password2" type="password" placeholder="Retype Password" name="pass2" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <button class="cancelbtn" onClick={this.redirectWelcome}>Cancel</button>
			      <button type="submit">Create Account</button>
			      <br/><br/><br/>
			      <button class="registerbtn" onClick={this.redirectLogin}>Login With Existing Account</button>
			    </div>
			  </form>
			</div>

        )
    }
}

export default SignUp;