import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import UserSummary from './UserSummary'

class UserList extends Component {
    render(){
        const { users } = this.props;
        return (
            <div className="user-list section">
                { users && users.map(user => {
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
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(UserList)