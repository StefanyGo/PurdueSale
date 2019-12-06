import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import UserSummary from './UserSummary'

class MyFollowing extends Component {
    state = {
        search: ''
    };
    

    onChange = e => {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    render(){
        const { users } = this.props;
        const { profile } = this.props;

        console.log(profile)
        const { search } = this.state;
        let filteredUsers;
        if (!users) {
            filteredUsers = users;
        } else {
            filteredUsers = users.filter(
                user => {
                    console.log(profile.following)
                    if (profile.following)
                    return profile.following.includes(user.email)
                }
            );
            filteredUsers = filteredUsers.filter(
                user => {
                    return user.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1
                }
            );
        }
        return (
            <div className="user-list section">
                <div className="card z-depth-0s">
                    <div className="card-content">
                    <span className="card-title">My Following</span>
                    </div>
                </div>
                <input type="text" value={this.state.search} onChange={this.onChange} />
                { filteredUsers && filteredUsers.map(user => {
                    return (
                        <Link to={'/user/' + user.id}>
                            <UserSummary user={user}/>
                        </Link>
                    )
                })
                }
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        profile: state.firebase.profile,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(MyFollowing)