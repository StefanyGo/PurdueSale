import React from 'react'

import { connect } from 'react-redux'
import { browserHistory } from 'react-router-dom'
import ProductList from './ProductList'
import ResetPassword from '../auth/ResetPassword';
import EditBio from '../auth/EditBio';
import EditImgUrl from '../auth/EditImgUrl';

const Settings = (props) => {
    const links = props.auth.uid ? 
    ( <div >
          <span className="card-title">Settings</span>
        <div >
            Hi, {props.profile.firstName} {props.profile.lastName}!

            <br/>
            <div class="row" >
                <div class="col"><ResetPassword history={props.history}/></div>
                <div class="col"><EditBio history={props.history}/></div>
                <div class="col"><EditImgUrl history={props.history}/></div>
        </div>
        </div>
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

    }

}

export default connect(mapStateToProps)(Settings)