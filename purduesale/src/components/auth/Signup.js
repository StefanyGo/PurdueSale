import './Login.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
		password: '',
		remember: false
    }
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
	}

	handleCheckmark = (e) => {
        this.setState({
            [e.target.id]: e.target.checked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
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
			      <input id="firstName" type="text" placeholder="Enter First Name" required="" onChange={this.handleChange}/>
			      <br/><br/>
                  <label htmlFor="lastname"><b>Last Name</b></label>
			      <input id="lastName" type="text" placeholder="Enter Last Name" required="" onChange={this.handleChange}/>
			      <br/><br/>
                  <label htmlFor="email"><b>Purdue Email</b></label>
			      <input id="email" type="text" placeholder="Enter Email" pattern="(\.?[a-z0-9]){5,}@purdue\.edu$" title="Must have a valid Purdue email to sign up." name="email" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <label htmlFor="pass"><b>New Password</b></label>
			      <input id="password" type="password" placeholder="Enter New Password" name="pass" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <label>
			        <input id="remember" type="checkbox" name="rmbr" onChange={this.handleCheckmark}/>
			        <span style={{paddingLeft: "25px"}}>Remember me</span>
			      </label>
			      <button type="submit">Sign Up</button>
			      <button class="cancelbtn" onClick={this.redirectWelcome}>Cancel</button>
			      <br/><br/><br/>
			      <button class="registerbtn" onClick={this.redirectLogin}>Login With Existing Account</button>
			    </div>
			  </form>
			</div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);