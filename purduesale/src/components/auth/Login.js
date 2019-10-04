import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

class Login extends Component {
    state = {
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
        this.props.signIn(this.state)
        this.props.history.push('/profile')
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

    redirectForgetPassword = () => {
        this.props.history.push('/forgotpass')
    }

    render() {
        const { authError } = this.props;
        return (
			<div align="center">
			  <button class="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Login</h2>
			      <label htmlFor="email"><b>Purdue Email</b></label>
			      <input id="email" type="text" placeholder="Enter Email" name="email" required="" pattern="(\.?[a-z0-9]){5,}@purdue\.edu$" title="Must enter a valid Purdue email to sign in." onChange={this.handleChange}/>
			      <br/><br/>
			      <label htmlFor="pass"><b>Password</b></label>
			      <input id="password" type="password" placeholder="Enter Password" name="pass" required="" checked="unchecked" onChange={this.handleChange}/>
			      <br/><br/>
			      <label>
			        <input id="remember" type="checkbox" name="rmbr" onChange={this.handleCheckmark}/>
			        <span style={{paddingLeft: "25px"}}>Remember me</span>
			      </label>

			      <button type="submit">Login</button>
			      <button class="cancelbtn" onClick={this.redirectWelcome} align="right">Cancel</button>
                  <div className="red-text center">
                      { authError ? <p>{authError}</p> : null }
                  </div>
			      <div align="right"><span class="password"><a onClick={this.redirectForgetPassword} >Forgot password?</a></span></div>
			      <br/><br/>
			      <button class="registerbtn" onClick={this.redirectRegister}>Register New Account</button>
			    </div>
			  </form>
			</div>

        )
    }
}

const mapStatetoProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login);