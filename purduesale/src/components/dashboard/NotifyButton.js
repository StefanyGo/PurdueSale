import '../auth/Login.css';
import React, { Component } from 'react';
import Select from 'react-select'
import { followProduct } from '../../store/actions/productActions'
import { unfollowProduct } from '../../store/actions/productActions'
import { connect } from 'react-redux'

class NotifyButton extends Component {

    follow = () => {
        console.log(this.props.email)
        if (this.props.email) {
            console.log("follow")
            this.props.followProduct(this.props.email, this.props.product)
        }
    }

    unfollow = () => {
        console.log(this.props.email)
        if (this.props.email) {
            console.log("follow")
            this.props.unfollowProduct(this.props.email, this.props.product)
        }
    }


    render() {
        const isFollowing = this.props.product.followers && this.props.email && this.props.product.followers.includes(this.props.email);
        let followbutton;
        if (isFollowing) {
            followbutton =  <div>
                                <button onClick={this.unfollow}> Unfollow </button>
                            </div>
        } else {
            followbutton =  <div>
                                <button onClick={this.follow}> Follow </button>
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
        followProduct: (email, product) => dispatch(followProduct(email, product)),
        unfollowProduct: (email, product) => dispatch(unfollowProduct(email, product)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyButton);