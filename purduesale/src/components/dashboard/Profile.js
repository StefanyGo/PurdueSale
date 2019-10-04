import React from 'react'

import { connect } from 'react-redux'

import userlogo1 from './userlogo1.png'

const Profile = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <span className="card-title">My Profile</span>
        <div >
            Hi, {props.profile.firstName} {props.profile.lastName}!
        </div>
        <img className="Avatar" src={props.profile.imageUrl || userlogo1} alt="UserLogo" width="200" height="150" />
        <br></br>
        <div>
            Your registered email address is: {props.profile.email}
        </div>
        <br></br>
        <div>
            Bio 
        </div>
        <div>
            {props.profile.bio}
        </div>
        <br></br>
        <div>
            The number of items you are selling is: {props.profile.sellingProducts}
        </div>
        <div>
            The number of items you have sold is: {props.profile.soldProducts}
        </div>
        <br></br>
        <br></br>
        <span className="card-title">Manage Account</span>
            <div >
            <div><span class="password"><a href="resetpass" >Reset password</a></span></div>
            <div><a href="editbio" >Update Bio</a></div>
            <div><a href="editimgurl" >Update Img</a></div>
            </div>
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
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Profile)