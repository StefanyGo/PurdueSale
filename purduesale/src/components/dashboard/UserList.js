import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import UserSummary from './UserSummary'

class UserList extends Component {
    state = {
        search: ''
    };
    

    onChange = e => {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    render(){
        const { users } = this.props;
        const { search } = this.state;
        let filteredUsers;
        if (!users) {
            filteredUsers = users;
        } else {
            filteredUsers = users.filter(
                user => {
                    return user.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1
                }
            );
        }
        return (
            <div className="user-list section">
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
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(UserList)