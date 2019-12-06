
import { getUsers } from '../../store/actions/userActions'
import '../auth/Login.css';
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class Inbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            updatable: true,
            contacts: [],
        };
    }

    render() {
		const { messages } = this.props
		const { auth } = this.props
		const { pathname } = this.props.location
        if (auth.uid) {
            if ((messages != null && typeof(messages) !== 'undefined' && this.state.updatable)) {
                let i = 0;
        for (i = 0; i < messages.length; i++) { 
            let message = messages[i];
            if (message.receiverID == auth.uid) {
                if (this.state.contacts.indexOf(message.senderID) == -1) {
                    this.state.contacts.push(message.senderID);
                }
            } else if (message.senderID == auth.uid) {
                if (this.state.contacts.indexOf(message.receiverID) == -1) {
                    this.state.contacts.push(message.receiverID);
                }
            }
        } 
            }      

            let out = []

            this.state.contacts.forEach(function(item) {
                    out.push( <div style={{marginTop: "8px", marginBottom: "8px"}} className="send" align="left">
                        <label><b style={{color: "#AFAFAF"}}>{item}</b></label>
                    </div> )

            }.bind(this))

            return (
                <div align="center">
			        <div className="container" style={{width: "450px"}} align="left">
			          <h2 style={{marginTop: "0px", marginBottom: "30px", fontSize: 18}} align="center">{this.state.receiverEmail}</h2>
                      {out}
			          <br/>
			        </div>
		    	</div>
            )
        }
        else {
            return (
                 <div >
                    Please login!
                </div> 
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
		profile: state.firebase.profile,
        messages: state.firestore.ordered.messages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
         getUsers: (messages, contacts) => dispatch(getUsers(messages, contacts)),
     }
 }

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'messages' }
    ])
	)(Inbox);