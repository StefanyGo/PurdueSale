import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import userlogo1 from './userlogo1.png'
import Notifications from './Notifications'

const Profile = (props) => {

    const links = props.auth.uid ? 
    ( <div className="row">
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
        <Notifications email={props.profile.email} notifications={props.notifications}/>
        <br></br>
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
            Total number of ratings:
        </div>
        <div>
            {props.profile.totalNumberOfRatings}
        </div>
        <div style={{fontWeight: 'bold'}}>
            Current rating:
        </div>
        <div>
            {(props.profile.totalNumberOfRatings !== 0) ? (props.profile.totalOfRatings / props.profile.totalNumberOfRatings) : "None"}
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
        profile: state.firebase.profile,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'notifications'},
    ])
)(Profile)