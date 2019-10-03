import React from 'react'

import { connect } from 'react-redux'

const Profile = (props) => {
    const links = props.auth.uid ? 
    ( <div >
        <span className="card-title">My Profile</span>
            <div >
                Hi, {props.profile.firstName}!
            </div>
        <br></br>
        <div>
            Your registered email address is: {props.profile.email}
        </div>
        <div>
            The number of items you are selling is: {props.profile.sellingProducts}
        </div>
        <div>
            The number of items you have sold is: {props.profile.soldProducts}
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