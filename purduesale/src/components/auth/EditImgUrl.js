import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { editImgUrl } from '../../store/actions/accountActions'

class EditImgUrl extends Component {
    state = {
        imgUrl: ''
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
        this.props.editImgUrl(this.state.imgUrl)
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
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Edit Image</h2>
                  <label><b>New Img</b></label>
			      <input id="imgUrl" type="text" placeholder="Enter New Img" name="imgUrl" required="" onChange={this.handleChange}/>
			      <br/><br/>
			      <button type="submit">Reset Img</button>
			      <button class="cancelbtn" onClick={this.redirectWelcome} align="right">Cancel</button>
			    </div>
			  </form>
			</div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editImgUrl: (imgUrl) => dispatch(editImgUrl(imgUrl))
    }
}

export default connect(null, mapDispatchToProps)(EditImgUrl);