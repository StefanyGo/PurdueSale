import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><a href="/">All Products</a></li>
            <li><a href="/postproduct">Sell Product</a></li>
            <li><a href="/myproductlist">My Products</a></li>
            <li><a href="/userlist">Find Users</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/login" onClick={props.signOut}>Logout</a></li>
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