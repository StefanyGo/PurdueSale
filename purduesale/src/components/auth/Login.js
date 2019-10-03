import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
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
			      <input id="email" type="text" placeholder="Enter Email" name="email" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <label htmlFor="pass"><b>Password</b></label>
			      <input id="password" type="password" placeholder="Enter Password" name="pass" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <div>
			        <input id="remember" type="checkbox" name="rmbr" align="right" />
			        <label>Remember me</label>
			      </div>

			      <button class="cancelbtn" onClick={this.redirectWelcome}>Cancel</button>
			      <button type="submit">Login</button>
                  <div className="red-text center">
                      { authError ? <p>{authError}</p> : null }
                  </div>
			      <div align="right"><span class="password"><a href="resetpassword">Forgot password?</a></span></div>
			      <br/><br/>
			      <button class="registerbtn" >Register New Account</button>
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

export default connect(null, mapDispatchToProps)(Login);