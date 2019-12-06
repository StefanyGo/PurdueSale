import React from 'react'

import { connect } from 'react-redux'

import userlogo1 from './userlogo1.png'

const Profile = (props) => {

    const links = props.auth.uid ? 
    ( <div >
        <span className="card-title" style={{fontSize: 35}}>My Profile</span><br/>
        <div style={{textDecorationLine: 'underline', fontSize: 18}}>
            {props.profile.firstName} {props.profile.lastName}
        </div>
        <img className="Avatar" src={props.profile.imageUrl || userlogo1} alt="UserLogo" width="200" height="150" />
        <br></br>
        <div style={{fontWeight: 'bold'}}>
            Your registered email address is: 
        </div>
        <div>
            {props.profile.email}
        </div>
        <div><a href="myfollowers" >{props.profile.numFollowers} Followers</a></div>
        <div><a href="myfollowing" >{props.profile.numFollowing} Following</a></div>
        <br/><br/>
        <div style={{fontWeight: 'bold', fontSize: 20, textDecorationLine: 'underline'}}>
            Bio 
        </div>
        <div style={{whiteSpace: 'pre-wrap', borderStyle: 'solid', borderWidth: '1px', borderColor: '#9F9F9F'}}>
            {props.profile.bio === "" ? " " : props.profile.bio}
        </div>
        <br/><br/>
        <div style={{fontWeight: 'bold'}}>
            The number of items you are selling is: 
        </div>
        <div>
            {props.profile.sellingProducts}
        </div>
        <div style={{fontWeight: 'bold'}}>
            The number of items you have sold is: 
        </div>
        <div>
            {props.profile.soldProducts}
        </div>
        <br/>
        <div style={{fontWeight: 'bold'}}>
            Total of ratings is:
        </div>
        <div>
            {props.profile.totalOfRatings / props.profile.totalNumberOfRatings}
        </div>
        <div style={{fontWeight: 'bold'}}>
            Total number of ratings is:
        </div>
        <div>
            {props.profile.totalNumberOfRatings}
        </div>

        <br></br>
        <br></br>
    </div>
    ) 
    : 
    ( <div >
        Please login!
    </div> )
    ;
    
    return (
        <div className="container section project-details" style={{marginTop: '20px'}}>
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