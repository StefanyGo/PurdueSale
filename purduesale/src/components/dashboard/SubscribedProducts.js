import React from 'react'

import { connect } from 'react-redux'
import SubscribedProductsList from './SubscribedProductsList'


const SubscribedProducts = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <span className="card-title">My Following's Products</span>
        <div >
            Welcome, {props.profile.firstName} {props.profile.lastName}!
        </div>    
        <SubscribedProductsList  products = {props.products} user = {props.profile}/>
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

export default connect(mapStateToProps)(SubscribedProducts)