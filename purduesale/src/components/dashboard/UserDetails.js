import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import GiveRating from './GiveRating';
import FollowButton from './FollowButton';

const UserDetails = (props) => {
    const { user } = props;
    if (user) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{user.firstName} {user.lastName}</span>
                        <p style={{whiteSpace: "pre-line"}}>{user.bio}</p>
                    </div>
                    <FollowButton user={user}/>
                    <br></br>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Email Address:</div>
                        <div>{user.email}</div>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Rating:</div>
                        <div>{(user.totalNumberOfRatings !== 0) ? (user.totalOfRatings / user.totalNumberOfRatings) : "None"}</div>
                    </div>
                    <GiveRating id={user.email} history={props.history}/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading users...</p>
            </div>
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const user = users ? users[id] : null
    return {
        user: user
    }
} 



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(UserDetails)