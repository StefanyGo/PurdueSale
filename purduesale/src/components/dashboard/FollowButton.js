import '../auth/Login.css';
import React, { Component } from 'react';
import Select from 'react-select'
import { addFollower } from '../../store/actions/accountActions'
import { connect } from 'react-redux'

class FollowButton extends Component {

    follow = () => {
        console.log(this.props.user.email)
        if (this.props.user.email) {
            console.log("here")
            this.props.addFollower(this.props.user.email)
        }
    }

    render() {
        const isFollowing = this.props.profile.following && this.props.user.email && this.props.profile.following.includes(this.props.user.email);
        let followbutton;
        if (isFollowing) {
            followbutton =  <div>
                                <button> Unfollow </button>
                                <div>You are following this person</div>
                            </div>
        } else {
            followbutton =  <div>
                                <button onClick={this.follow}> Follow </button>
                                <div>You are not following this person</div>
                            </div>
        }
        return (
		<div>
            {followbutton}
        </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFollower: (email) => dispatch(addFollower(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);