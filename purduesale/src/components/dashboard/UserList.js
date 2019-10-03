import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import UserSummary from './UserSummary'

class UserList extends Component {
    render(){
        const { users } = this.props;
        return (
            <div className="user-list section">
                { users && users.map(user => {
                    return (
                        <UserSummary user={user}/>
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