import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
    return (<div>

  <ul class="sidenav" id="mobile-demo">
                <li><a href="/">Global Store</a></li>
                <li><a href="/subscribedproducts">Subscribed Products</a></li>
                <li><a href="/myproductlist">Edit My Products</a></li>
                <li><a href="/postproduct">Sell Product</a></li>
                <li><a href="/userlist">Find Users</a></li>
                <li><a href="/faq">FAQ</a></li>
  </ul>
  
        <nav className="nav-wrapper.grey-darken-3">
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>

            <div className="navbar-container">
                <Link to='/' className="left" style={{fontSize: 35, paddingLeft: "10px"}}>PurdueSale</Link>
                { links }
            </div>
        </nav>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)