import '../auth/Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNewProduct } from '../../store/actions/accountActions'

class GiveRating extends Component {
    state = {
        productName: '',
		comments: ''
	}
	errors = {
		productName: false,
		comments: false
	}

	errorUpdate(productName, comments) {
		this.errors["productName"] = productName.length === 0;
		this.errors["comments"] = comments.length === 0;
		this.forceUpdate();
	}
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
	}

    handleSubmit = (e) => { 
		e.preventDefault();
		this.errorUpdate(this.state.productName, this.state.comments);
		var safe = true;
		Object.entries(this.errors).forEach(function([item, value]) {
			if (value === true)
                safe = false;
                
            if (safe === true) {
                // this.props.addNewProduct(this.state)
                // this.props.history.push('/profile')
            }
		});
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
			  <button className="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <input id="productName" type="text" placeholder="Enter Product Name" name="ratingName" required="" onChange={this.handleChange}/>
				  {this.errors["productName"] ? <span style={{color: "red"}}>Product name is required.</span> : ''}
			      <br/>
                  
                  <br/>
			      <label htmlFor="prodDesc"><b>Description</b></label>
			      <textarea id="description" placeholder="Enter any comments about rating." name="ratingDesc" required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px"}} onChange={this.handleChange}/>
				  {this.errors["comments"] ? <span style={{color: "red"}}>Please enter why you gave this rating.</span> : ''}
			      <br/><br/>
			      <button type="submit">Submit</button>
			      <button className="cancelbtn" onClick={this.redirectHome}>Cancel</button>
			    </div>
			  </form>
			</div>

        )
    }
}
export default GiveRating;