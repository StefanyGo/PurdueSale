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

const TMPID = "0";

class EditProduct extends Component {
	constructor(props) {
	  super(props);
	}

    state = {
		productID: "",
        productName: "",
		description: "",
		tag: "",
		status: "",
		price: "",
		oncampus: false,
		previousSold: false,
		isTextbook: false,
		textbookCourse: ""
	}
	errors = {
		productName: false,
		description: false,
		price: false,
		textbookCourse: false
	}

	updateFields() {
        
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
		if (e.value == "Textbooks") {
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

			if (!this.state.isTextbook)
				this.setState({textbookCourse: ""})

			this.props.addNewProduct(this.state)
            this.props.history.push('/profile')
		}
    }
    
	redirectWelcome = () => {
		this.props.history.push('/')
	}
	
	redirectHome = () => {
		this.props.history.push('/home')
	}

    render() {
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
		editProductLayout(this.props);
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

function editProductLayout(props) {
	const { auth } = props;
	const { profile } = props;
	const uid = auth.uid;
	console.log(uid);
	/*firestore.collection('users').doc(uid).get().then(function(doc) {
		if (doc.exists) {
			var ref;
			firestore.collection('users').doc(uid).collection('products').doc(TMPID).get().then(function(func) {
				ref = firestore.document(doc.data().productReference);
				console.log(ref);
			}).then(function() {
				ref.get().then(function(upd) {
					this.setState({
						productName: upd.data().productName,
						description: upd.data().description,
						tag: upd.data().tag,
						status: upd.data().status,
						price: upd.data().price,
						oncampus: upd.data().oncampus,
					})
				})
			})
		} else {
			console.log("Document does not exist!");
		}
	}).catch(function(error) {
		console.log("Error with document!:", error);
	});
	
	// I NEED THE UID OVER HERE!
*/
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
		console.log(props)
        return [
            /*{
				collection: "users",
				doc: props.auth.uid,
				subcollections: [{ collection: "products" }]
			},*/
			{
				collection: "products"
			}
        ];
	})
	)(EditProduct);