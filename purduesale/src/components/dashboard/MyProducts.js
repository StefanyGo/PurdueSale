import React from 'react'

import { connect } from 'react-redux'
import MyProductList from './MyProductList'


const MyProducts = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <h3> My Products </h3>
        <div >
            Click on each product to edit its details!
        </div>    
        <MyProductList  products = {props.products} user = {props.profile}/>
    </div>
    ) 
    : 
    ( <div >
        Please login!
    </div> )
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

export default connect(mapStateToProps)(MyProducts)