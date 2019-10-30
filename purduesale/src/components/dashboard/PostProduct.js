import '../auth/Login.css';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { addNewProduct } from '../../store/actions/accountActions'
import { uuidv4 } from '../../components/auth/EditImgUrl'
import { storage } from '../../config/fbConfig.js';

//const productTags = ["Furniture", "Textbooks", "Electronics", "Office Supplies", "Tools", "Clothes", "Food", "Transportation", "Other"];
const productTags = [
	{value: "Furniture", label: "Furniture"},
	{value: "Textbooks", label: "Textbooks"},
	{value: "Electronics", label: "Electronics"},
	{value: "Office Supplies", label: "Office Supplies"},
	{value: "Tools", label: "Tools"},
	{value: "Clothes", label: "Clothes"},
	{value: "Food", label: "Food"},
	{value: "Transportation", label: "Transportation"},
	{value: "Other", label: "Other"}
];

export function getProductTags() {
	return productTags;
}

class PostProduct extends Component {
    state = {
        productName: "",
		description: "",
		tag: "Select a Product Tag",
		image: null,
		imgUrl: '',
		dimensions: null
	}
	errors = {
		productName: false,
		description: false,
		tag: false,
		image: false
	}

	errorUpdate(productName, description, tag, image) {
		this.errors["productName"] = (productName.length === 0);
		this.errors["description"] = (description.length === 0);
		this.errors["tag"] = (tag === "Select a Product Tag");
		this.errors["image"] = (image == null);
		this.forceUpdate();
	}
	
	handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
	}

	handleSelectChange = (e) => {
        this.setState({
            tag: e.value
        })
	}

	handleFileUpload = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }

    handleSubmit = (e) => {
		e.preventDefault();
		this.errorUpdate(this.state.productName, this.state.description, this.state.tag, this.state.image);
		var safe = true;
		Object.entries(this.errors).forEach(function([item, value]) {
			if (value === true)
				safe = false;
		});
		if (safe) {
			const {image} = this.state;
			const rnd = uuidv4();
			const uploadTask = storage.ref(`images/${rnd}`).put(image);
        	uploadTask.on('state_changed',
        	(snapshot) => {

        	}, (error) => {
            	console.log(error);
        	}, () => {
            	storage.ref('images').child(rnd).getDownloadURL().then(imgUrl => {
                	console.log(imgUrl);
                	this.setState({imgUrl});
					this.props.addNewProduct(this.state)
            		this.props.history.push('/profile')
            	})
        	})
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
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Sell New Product</h2>
			      <label htmlFor="file"><b>Product Image</b></label>
                  <input type="file" id="file" onChange={this.handleFileUpload} name="file"/>
				  {this.errors["image"] ? <span style={{color: "red"}}>Please select an image for your product.</span> : ''}
			      <br/><br/><br/>
                  <label htmlFor="prodName"><b>Product Name</b></label>
			      <input id="productName" type="text" placeholder="Enter Product Name" name="prodName" required="" onChange={this.handleChange}/>
				  {this.errors["productName"] ? <span style={{color: "red"}}>Product name is required.</span> : ''}
			      <br/><br/>
			      <label htmlFor="prodDesc"><b>Description</b></label>
			      <textarea id="description" placeholder="Enter Product Description" name="prodDesc" required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px"}} onChange={this.handleChange}/>
				  {this.errors["description"] ? <span style={{color: "red"}}>Please enter a product description.</span> : ''}
			      <br/><br/>
				  <div>
			        <label htmlFor="tag"><b>Product Tag</b></label>
				    <Select id="tag"
        			  value={"Furniture"}
    				  onChange={this.handleSelectChange}
        			  options={getProductTags()}
					  placeholder={this.state.tag}
      				/>
				  </div>
				  {this.errors["tag"] ? <span style={{color: "red"}}>Please select a tag to describe your product.</span> : ''}
				  <br/><br/>
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