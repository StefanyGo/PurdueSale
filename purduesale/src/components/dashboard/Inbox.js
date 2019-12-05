import React from 'react'

import { connect } from 'react-redux'
import MyMessagesList from './MyProductList'


const Inbox = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <span className="card-title">Inbox</span>
        <MyMessagesList  messages = {props.messages} user = {props.profile}/>

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
        products: state.product.products,
        messages: state.firestore.messages,
    }
}

export default connect(mapStateToProps)(Inbox)