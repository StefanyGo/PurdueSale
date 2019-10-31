import '../auth/Login.css';
import React, { Component } from 'react';
import Select from 'react-select'
import { userActions } from '../../store/actions/userActions'

const ratings = [
	{value: "1", label: "1"},
	{value: "2", label: "2"},
	{value: "3", label: "3"},
	{value: "4", label: "4"},
	{value: "5", label: "5"},
];

export function getRatings() {
	return ratings;
}

export function errorUpdate(productName, comments, ratings) {
	this.errors["productName"] = (productName.length === 0);
	this.errors["comments"] = (comments.length === 0);
	this.errors["rating"] = (ratings === "Please select a rating");
	this.forceUpdate();
}

export function handleChange(e)  {
	this.setState({
		[e.target.id]: e.target.value
	})
}

export function handleSelectChange(e) {
	this.setState({
		rating: e.value
	})
}

export function handleSubmit(e) { 
	e.preventDefault();
	this.errorUpdate(this.state.productName, this.state.comments, this.state.rating);
	var safe = true;
	Object.entries(this.errors).forEach(function([item, value]) {
		if (value === true)
			safe = false;
			
		if (safe === true) {
			//console.log("no errors!");
			
		}
	});

	console.log(this.state.rating);

}

export function redirectWelcome() {
	this.props.history.push('/')
}

export function redirectLogin() {
	this.props.history.push('/login')
}

export function redirectHome() {
	this.props.history.push('/home')
}

const GiveRating = (props) => {
	this.state = {
		productName: '',
		comments: '',
		rating: 'Please select a rating'
	}
	this.errors = {
		productName: false,
		comments: false,
		rating: false
	}
	
	return (
		<div align="center">
		  <button className="logobtn" onClick={this.redirectWelcome}></button>
		  <form onSubmit={this.handleSubmit} className="white">   
			<div className="container" style={{width: "350px"}} align="left">
			  <input id="productName" type="text" placeholder="Enter Product Name" name="ratingName" required="" onChange={this.handleChange}/>
			  {this.errors["productName"] ? <span style={{color: "red"}}>Product name is required.</span> : ''}
			  <br/>
			  <div>
				<label htmlFor="rating"><b>Rating</b></label>
				<Select id="rating"
				  onChange={this.handleSelectChange}
				  options={getRatings()}
				  placeholder={this.state.rating}
				  />
			  </div>
			  {this.errors["rating"] ? <span style={{color: "red"}}>Please select a rating to describe interactions.</span> : ''}
			  <br/><br/>
			  <label htmlFor="comments"><b>Comments</b></label>
			  <textarea id="comments" placeholder="Enter any comments about rating." name="ratingDesc" required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px"}} onChange={this.handleChange}/>
			  <br/>
			  <button type="submit">Submit</button>
			  <button className="cancelbtn" onClick={this.redirectHome}>Cancel</button>
			</div>
		  </form>
		</div>

	)
	}

export default GiveRating;