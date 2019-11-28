import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { resetPassword } from '../../store/actions/authActions'

class ResetPass extends Component {
    state = {
        pass1: '',
        pass2: ''
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
        this.props.resetPassword(this.state.pass1, this.state.pass2)
    }
    
	redirectWelcome = () => {
		this.props.history.push('/profile')
	}
	
	redirectHome = () => {
		this.props.history.push('/')
    }

    render() {
        return (
			<div align="center">
			  <button className="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Reset Password</h2>
			      <label htmlFor="pass1"><b>Current Password</b></label>
			      <input id="pass1" type="password" placeholder="Enter Current Password" name="pass1" required="" onChange={this.handleChange}/>
			      <br/><br/>
                  <label htmlFor="pass1"><b>New Password</b></label>
			      <input id="pass2" type="password" placeholder="Enter New Password" name="pass2" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <button type="submit">Reset Password</button>
			      <button className="cancelbtn" onClick={this.redirectWelcome} align="right">Cancel</button>
			    </div>
			  </form>
			</div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (password1, password2) => dispatch(resetPassword(password1, password2))
    }
}

export default connect(null, mapDispatchToProps)(ResetPass);