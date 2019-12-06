import React from 'react'

import { connect } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import ProductList from './ProductList'

const Home = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <h3>Store</h3>
        <div >
            Welcome, {props.profile.firstName} {props.profile.lastName}!
        </div>    
        <ProductList  products = {props.products} user = {props.profile}/>
    </div>
    ) 
    : 
    ( <div >
        Welcome to PurdueSale!  Please login to access the site!
	    <div >
          <br/>
	      <button className="logbtn" style={{width: "100px"}} onClick={event =>  window.location.href='/login'}>Login</button>
          <br/>
	      <button className="regbtn" style={{width: "100px", backgroundImage: "linear-gradient(#4F4FBF, #2F2F9F)"}} onClick={event =>  window.location.href='/signup'}>Register</button>
        </div>
      </div>
    )
    ;
    
    return (
            <div className="card z-depth-0s">
                <div className="card-content">
                { links }
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        products: state.product.products
    }
}

export default connect(mapStateToProps)(Home)