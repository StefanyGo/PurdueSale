import '../auth/Login.css';
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select'
import { editProduct } from '../../store/actions/productActions'
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { getProductTags } from './PostProduct'
import { firestoreConnect } from 'react-redux-firebase'

const statusOptions = [
	{value: "Available", label: "Available"},
	{value: "On Discussion", label: "On Discussion"},
	{value: "Sold", label: "Sold"},
	{value: "Removed", label: "Removed"}
];

class EditProduct extends Component {

    state = {
		userProductID: "",
        productName: "",
		description: "",
		tag: "",
		status: "",
		price: "",
		decPrice: 0,
		oncampus: false,
		previousSold: false,
		isTextbook: false,
		textbookCourse: "",
		updatable: true
	}
	errors = {
		productName: false,
		description: false,
		price: false,
		textbookCourse: false
	}

	errorUpdate(productName, description, price, textbook, isTextbook) {
		this.errors["productName"] = (productName.length === 0);
		this.errors["description"] = (description.length === 0);
		this.errors["price"] = (price.length === 0);
		this.errors["textbookCourse"] = (isTextbook && textbook.length === 0);
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
		if (e.value === "Textbooks") {
			this.setState({
				isTextbook: true
			})
		}
		else {
			this.setState({
				isTextbook: false
			})
			this.errors["textbookCourse"] = false;
		}
	}	

	handleAvailableChange = (e) => {
        this.setState({
            status: e.value
        })
	}

	handleFileUpload = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
	}    
	
	handleCheckmark = (e) => {
        this.setState({
            [e.target.id]: e.target.checked
        })
    }

    handleSubmit = (e) => {
		e.preventDefault();
		this.errorUpdate(this.state.productName, this.state.description, this.state.price, this.state.textbookCourse, this.state.isTextbook);
		var safe = true;
		Object.entries(this.errors).forEach(function([item, value]) {
			if (value === true)
				safe = false;
		});
		if (safe) {
			// Format price
			var tmpPrice = this.state.price;
			var index = tmpPrice.indexOf('_');
			if (index >= 0) {
				tmpPrice = tmpPrice.substring(0, index) + tmpPrice.substring(index + 1);
				this.setState({price: tmpPrice})
			}
			index = tmpPrice.indexOf('.');
			if (index < 0) {
				tmpPrice += ".00";
				this.setState({price: tmpPrice})
			}
			index = tmpPrice.indexOf('.');
			if (index === tmpPrice.length - 2) {
				tmpPrice += "0";
				this.setState({price: tmpPrice})
			}
			else if (index === tmpPrice.length - 1) {
				tmpPrice += "00";
				this.setState({price: tmpPrice})
			}
			if (index <= 1) {
				tmpPrice = "$0" + tmpPrice.substring(index);
				this.setState({price: tmpPrice})
			}
			
			var toDec = tmpPrice;
			index = toDec.indexOf(',');
			while (index >= 0) {
				toDec = toDec.substring(0, index) + toDec.substring(index + 1);
				index = toDec.indexOf(',');
			}
			this.setState({decPrice: parseFloat(toDec.substring(1))});
			console.log(parseFloat(toDec.substring(1)))

			this.props.editProduct(this.state)
            this.props.history.push('/profile')
		}
    }
    
	redirectWelcome = () => {
		this.props.history.push('/')
	}
	
	redirectHome = () => {
		this.props.history.push('/home')
	}

	editProductLayout(pathname, products, auth) {
		var index = pathname.lastIndexOf('/');
		var updPath = pathname.substring(index + 1)
		index = updPath.lastIndexOf('_');
		var userPath = updPath.substring(0, index)
		
		if (userPath !== auth.email)
			this.props.history.push('/product/' + updPath)

		var product;
		products.forEach(function(item) {
			if (item.id === updPath) {
				product = item;
				return;
			}
		});

		if (!product)
			return;

		this.setState({
			userProductID: product.userProductID,
        	productName: product.productName,
			description: product.description,
			tag: product.tag,
			status: product.status,
			price: product.price,
			decPrice: product.decPrice,
			oncampus: product.oncampus,
			previousSold: product.previousSold,
			isTextbook: product.isTextbook,
			textbookCourse: product.textbookCourse
		})
		if (product.status === "Sold") {
			this.setState({
				previousSold: true
			})
		}
	}

    render() {
		const { products } = this.props
		const { auth } = this.props
		const { pathname } = this.props.location
        if ((products != null && typeof(products) !== 'undefined' ) && this.state.updatable) {
			this.setState({ updatable: false })
			this.editProductLayout(pathname, products, auth);
        }
		const currencyMask = createNumberMask({
			prefix: '$',
			suffix: '',
			includeThousandsSeparator: true,
			thousandsSeparatorSymbol: ',',
			allowDecimal: true,
			decimalSymbol: '.',
			decimalLimit: 2,
			integerLimit: 7,
			allowNegative: false,
			allowLeadingZeroes: false,
		})
        return (
			<div align="center">
			  <button className="logobtn" onClick={this.redirectWelcome}></button>
			  <form onSubmit={this.handleSubmit} className="white">   
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Edit Product</h2>
				  <div>
			        <label htmlFor="status"><b>Product Status</b></label>
				    <Select id="status"
    				  onChange={this.handleAvailableChange}
        			  options={statusOptions}
					  placeholder={this.state.status}
					  value={this.state.status}
      				/>
				  </div>
				  <br/><br/>
                  <label htmlFor="prodName"><b>Product Name</b></label>
			      <input id="productName" type="text"  value={this.state.productName} placeholder="Enter Product Name" name="prodName" required="" onChange={this.handleChange}/>
				  {this.errors["productName"] ? <span style={{color: "red"}}>Product name is required.</span> : ''}
			      <br/><br/>
			      <label htmlFor="prodDesc"><b>Description</b></label>
			      <textarea id="description" placeholder="Enter Product Description" value={this.state.description} name="prodDesc" required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px"}} onChange={this.handleChange}/>
				  {this.errors["description"] ? <span style={{color: "red"}}>Please enter a product description.</span> : ''}
			      <br/><br/>
			      <label htmlFor="price"><b>Price</b></label>
				  <MaskedInput id="price" mask={currencyMask} placeholder="$0.00" value={this.state.price} onChange={this.handleChange}/>
				  {this.errors["price"] ? <span style={{color: "red"}}>Please enter a price for your product.</span> : ''}
			      <br/><br/>
			      <label>
			        <input id="oncampus" type="checkbox" name="campus" onChange={this.handleCheckmark} value={this.state.oncampus}/>
			        <span style={{paddingLeft: "25px"}}>Selling item on campus</span>
			      </label>
				  <br/><br/>
				  <div>
			        <label htmlFor="tag"><b>Product Tag</b></label>
				    <Select id="tag"
    				  onChange={this.handleSelectChange}
        			  options={getProductTags()}
					  placeholder={this.state.tag}
					  value={this.state.tag}
      				/>
				  </div>
				  <br/>
				  {this.state["isTextbook"] ? <div><label htmlFor="textbookCourse"><b>Textbook</b>
				  	  </label><input id="textbookCourse" type="text" value={this.state.textbookCourse} placeholder="Enter Course Number" name="textbook" required="" onChange={this.handleChange}/></div> : ''}
				  {this.errors["textbookCourse"] ? <span style={{color: "red"}}>Please enter a course number for the textbook.<br/></span> : ''}
				  <br/>
			      <button type="submit">Update</button>
			      <button className="cancelbtn" onClick={this.redirectHome}>Cancel</button>
			    </div>
			  </form>
			</div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
		profile: state.firebase.profile,
		products: state.firestore.ordered.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProduct: (product) => dispatch(editProduct(product)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'products' }
    ])
	)(EditProduct);