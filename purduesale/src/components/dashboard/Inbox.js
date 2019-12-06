
import { getUsers, print } from '../../store/actions/userActions'
import '../auth/Login.css';
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

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
        const { users } = this.props

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

            let names = [];
            names = getUsers(users, this.state.contacts);

            
            let out = [];

            if (names != null) {
                let j = 0;
                let unreads = this.props.users.find(e => e.id === auth.uid).unreads;
                let k = this.state.contacts.length -1;
                for (j = 0; j < this.state.contacts.length && k > -1; j++, k--) {
                    let contact = this.state.contacts[j];
                    let name = names[j];
                    let isUnread = false;
                    if (unreads.includes(contact.toString())) {
                        isUnread = true;
                    }

                    out.push( <div style={{marginTop: "8px", marginBottom: "8px"}} key={contact} className="inbox-list" align="left">
                        <Link to={'/messages/' + contact}><b style={isUnread ? {color: "black", fontStyle: "italic"} : {color: "black"}}>{isUnread ? ("(!) " + name + " (!)") : name}</b></Link>
                    </div> )

                    contact = "";
                }
            }
            
            return (
                <div align="center">
			        <div className="container" style={{width: "450px"}}>
                    <h3> Inbox </h3>
			          <h2 style={{marginTop: "0px", marginBottom: "30px", fontSize: 18}} align="center"></h2>
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
        users: state.firestore.ordered.users,
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
        { collection: 'messages' },
        { collection: 'users'}
    ])
	)(Inbox);