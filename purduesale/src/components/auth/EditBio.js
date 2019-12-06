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
        this.props.history.push('/profile')
    }
    
	redirectWelcome = () => {
		this.props.history.push('/profile')
	}

    render() {
        return (
			<div align="center">
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
                <h6 align="center"> Edit Bio </h6>
                <br/>
                  <label><b>New Bio</b></label>
			      <textarea id="bio" placeholder="Enter New Bio" name="bio" required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px"}} onChange={this.handleChange}/>
			      <br/><br/>
			      <button type="submit">Edit Bio</button>
			      <button className="cancelbtn" onClick={this.redirectWelcome} align="right">Cancel</button>
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