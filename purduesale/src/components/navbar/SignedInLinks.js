import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import settings from '../../settings.png'; // with import
import logout from '../../logout.png'; // with import
import message from '../../message.png'; // with import
import messagenew from '../../messagenew.png'; // with import


const SignedInLinks = (props) => {
    return (
        <div class="nav-menu">
        <ul className="right">
            <li><a href="/">Global Store</a></li>
            <li><a href="/subscribedproducts">Subscribed Products</a></li>
            <li><a href="/myproductlist">Edit My Products</a></li>
            <li><a href="/postproduct">Sell Product</a></li>
            <li><a href="/userlist">Find Users</a></li>
                {/* <li><a href="/inbox"><img src={props.profile.unreadsSize > 0 ? messagenew : message} style={{width:55, height:55, margin: "8px"}} /></a></li>
                <li><a href="/settings"><img src={settings} style={{width:45, height:45, margin: "8px"}} /></a></li>
                <li><a href="/login" onClick={props.signOut}><img src={logout} style={{width:60, height:60, padding: "0px"}} /></a></li> */}
            <li></li>
            {props.profile.unreadsSize > 0 ? (<li><a href="/inbox"><i class="material-icons">drafts</i></a></li>) : (<li><a href="/inbox"><i class="material-icons">mail</i></a></li>)}
            <li><a href="/settings"><i class="material-icons">settings</i></a></li>
            <li><a href="/login" onClick={props.signOut}><i class="material-icons">settings_power</i></a></li>
        </ul>

        <NavLink to='/profile' className='init btn btn-floating pink lighten-1'>
                {props.profile.initials}
            </NavLink>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)