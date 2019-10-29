import '../auth/Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNewProduct } from '../../store/actions/accountActions'

const productTags = ["Furniture", "Textbooks", "Electronics", "Office Supplies", "Tools", "Clothes", "Food", "Transportation", "Other"];

export function getProductTags() {
	return productTags;
}

class PostProduct extends Component {
    state = {
        productName: "",
		description: "",
		tag: "Select a tag:"
	}
	errors = {
		productName: false,
		description: false,
		tag: false
	}

	errorUpdate(productName, description, tag) {
		this.errors["productName"] = (productName.length === 0);
		this.errors["description"] = (description.length === 0);
		this.errors["tag"] = (tag === "Select a tag:");
		this.forceUpdate();
	}
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
	}

    handleSubmit = (e) => {
		e.preventDefault();
		this.errorUpdate(this.state.productName, this.state.description, this.state.tag);
		var safe = true;
		Object.entries(this.errors).forEach(function([item, value]) {
			if (value === true)
				safe = false;
		});

		if (safe === true) {
        	this.props.addNewProduct(this.state)
			this.props.history.push('/profile')
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
			  <button className="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Sell New Product</h2><br/>
                  <label htmlFor="prodName"><b>Product Name</b></label>
			      <input id="productName" type="text" placeholder="Enter Product Name" name="prodName" required="" onChange={this.handleChange}/>
				  {this.errors["productName"] ? <span style={{color: "red"}}>Product name is required.</span> : ''}
			      <br/><br/>
			      <label htmlFor="prodDesc"><b>Description</b></label>
			      <textarea id="description" placeholder="Enter Product Description" name="prodDesc" required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px"}} onChange={this.handleChange}/>
				  {this.errors["description"] ? <span style={{color: "red"}}>Please enter a product description.</span> : ''}
			      <br/><br/>
				  <div>
				  <select id="tag" name="tagSelect" value="Select a tag:">
    				{getProductTags().map((e, key) => {
        			  return <option key={key} value={e.value}>{e}</option>;
    				})}
				  </select>
				  </div>
				  {this.errors["tag"] ? <span style={{color: "red"}}>Please select a tag to describe your product.</span> : ''}
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
        addNewProduct: (newProduct) => dispatch(addNewProduct(newProduct))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostProduct);