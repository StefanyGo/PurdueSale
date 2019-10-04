import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { editBio } from '../../store/actions/accountActions'

class EditBio extends Component {
    state = {
        bio: ''
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
        this.props.editBio(this.state.bio)
    }
    
	redirectWelcome = () => {
		this.props.history.push('/profile')
	}

    render() {
        return (
			<div align="center">
			  <button class="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Edit Bio</h2>
                  <label><b>New Bio</b></label>
			      <input id="bio" type="text" placeholder="Enter New Bio" name="bio" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <button type="submit">Edit Bio</button>
			      <button class="cancelbtn" onClick={this.redirectWelcome} align="right">Cancel</button>
			    </div>
			  </form>
			</div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editBio: (bio) => dispatch(editBio(bio))
    }
}

export default connect(null, mapDispatchToProps)(EditBio);