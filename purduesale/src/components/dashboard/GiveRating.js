import '../auth/Login.css';
import React, { Component } from 'react';
import Select from 'react-select'
import { giveRating } from '../../store/actions/accountActions'
import { connect } from 'react-redux'
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

class GiveRating extends Component {
    state = {
		comments: '',
		rating: 'Please select a rating',
		email: this.props.id,
	}
	errors = {
		comments: false,
		rating: false
	}

	errorUpdate(productName, comments, ratings) {
		this.errors["comments"] = (comments.length === 0);
		this.errors["rating"] = (ratings === "Please select a rating");
		this.forceUpdate();
	}
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
	}

	handleSelectChange = (e) => {
        this.setState({
            rating: e.value
        })
	}

    handleSubmit = (e) => { 
		e.preventDefault();
		this.errorUpdate(this.state.productName, this.state.comments, this.state.rating);
		var safe = true;
		Object.entries(this.errors).forEach(function([item, value]) {
			if (value === true)
                safe = false;
		});

		if (safe === true) {
			this.props.giveRating(this.state.rating);

		}
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
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
				  <div>
			        <label htmlFor="rating"><b>Rating</b></label>
				    <Select id="rating"
    				  onChange={this.handleSelectChange}
        			  options={getRatings()}
					  placeholder={this.state.rating}
      				/>
				  </div>
				  {this.errors["rating"] ? <span style={{color: "red"}}>Please select a rating to describe interactions.</span> : ''}
                  <br/>
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
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        giveRating: (rating) => dispatch(giveRating(rating))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveRating);