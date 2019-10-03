import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { forgotPassword } from '../../store/actions/authActions'

class ForgotPass extends Component {
    state = {
        email: '',
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
        this.props.forgotPassword(this.state.email)
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

    render() {
        return (
			<div align="center">
			  <button class="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Forgot Password</h2>
			      <label htmlFor="email"><b>Purdue Email</b></label>
			      <input id="email" type="text" placeholder="Enter Email" name="email" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <label>
			        <input id="remember" type="checkbox" name="rmbr" onChange={this.handleCheckmark}/>
			        <span style={{paddingLeft: "25px"}}>Remember me</span>
			      </label>

			      <button type="submit">Send Verification Email</button>
			      <button class="cancelbtn" onClick={this.redirectWelcome} align="right">Cancel</button>
			      <button class="registerbtn" onClick={this.redirectRegister}>Register New Account</button>
			    </div>
			  </form>
			</div>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(forgotPassword(email))
    }
}

export default connect(null, mapDispatchToProps)(ForgotPass);