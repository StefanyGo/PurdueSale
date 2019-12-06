import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import settings from '../../settings.png'; // with import
import logout from '../../logout.png'; // with import
import message from '../../message.png'; // with import



const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><a href="/">Global Store</a></li>
            <li><a href="/subscribedproducts">Subscribed Products</a></li>
            <li><a href="/myproductlist">Edit My Products</a></li>
            <li><a href="/postproduct">Sell Product</a></li>
            <li><a href="/userlist">Find Users</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/inbox"><img src={message} style={{width:55, height:55, margin: "8px"}} /></a></li>
            <li><a href="/settings"><img src={settings} style={{width:45, height:45, margin: "8px"}} /></a></li>
            <li><a href="/login" onClick={props.signOut}><img src={logout} style={{width:60, height:60, padding: "0px"}} /></a></li>
            <li><NavLink to='/profile' className='btn btn-floating pink lighten-1'>
                {props.profile.initials}
            </NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)