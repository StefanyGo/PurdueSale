import React from 'react'

import { connect } from 'react-redux'
import ProductList from './ProductList'


const Home = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <span className="card-title">Home</span>
        <div >
            Hi, {props.profile.firstName} {props.profile.lastName}!
        </div>    
        <ProductList  products = {props.products}/>
    </div>
    ) 
    : 
    ( <div >
        Please login!
    </div> )
    ;
    
    return (
        <div className="container section project-details">
            <div className="card z-depth-0s">
                <div className="card-content">
                { links }
                </div>
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