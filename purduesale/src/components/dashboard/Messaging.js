import '../auth/Login.css';
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { addMessage, addFirstMessage, removeFalseMessage, updateReceipt } from '../../store/actions/messagingActions'

class Messaging extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatable: true,
            senderID: null,
            receiverID: null,
            senderEmail: "",
            receiverEmail: "",
            messageArr: [],
            firstUpdatable: 2,
            messageID: "",
            isRead: false,
            readDate: "",

            date: "",
            text: "",
        };
    }

    keyPressed = (e) => {
        if (e.keyCode === 13 && !e.shiftKey)
            this.submitPost(e);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    submitPost = (e) =>  {
        e.preventDefault();
        if (this.state.text === "") {
            return;
        }

        this.props.addMessage(this.state);
        this.state.messageArr.push(this.state);
        this.setState({
            text: ""
        })
		this.forceUpdate();
    }

    loadMessages(pathname, messages, auth) {
        var index = pathname.lastIndexOf('/');
        var otherUser = pathname.substring(index + 1)
        var sender = auth.uid;
        var newMessageID = this.state.messageID;
        var isRead = false;
        var readDate = "";

        if (this.state.firstUpdatable === 2) {
            this.setState({
                senderID: sender,
                senderEmail: auth.email,
                receiverID: otherUser,
                firstUpdatable: 1
            })
        
            if (otherUser < sender) {
                newMessageID = otherUser + sender
            }
            else {
                newMessageID = sender + otherUser
            }
            
            this.setState({
                messageID: newMessageID
            })
        }

        let messageID = this.state.messageID
        let messageArr = []

		messages.forEach(function(item) {
			if (item.messageID === messageID) {
				messageArr.push(item);
				return;
			}
        });

        messageArr.sort(function(a, b) {
            var ret = a.date.seconds - b.date.seconds;
            if (ret === 0) {
                ret = a.date.nanoseconds - b.date.nanoseconds;
            }
            return ret
        });

        if (this.state.firstUpdatable === 1 && messageArr.length !== 0) {
            if (messageArr[0].senderEmail === auth.email)
                this.setState({ 
                    receiverEmail: messageArr[0].receiverEmail
             })
            else
                this.setState({ 
                    receiverEmail: messageArr[0].senderEmail
                })
            this.setState({
                firstUpdatable: 0
            })

            for (var i = messageArr.length - 1; i >= 0; --i) {
                if (messageArr[i].invisible) {
                    this.props.removeFalseMessage(messageArr[i]);
                    messageArr.splice(i, i+1);
                }
            }
        }
        else if (this.state.firstUpdatable === 1) {
            this.props.addFirstMessage({
                senderID: sender,
                senderEmail: auth.email,
                receiverID: otherUser,
                messageID: newMessageID
            });
        }

        if (messageArr.length > 0) {
            if (messageArr[0].invisible)
                messageArr.splice(0, 1);
            if (messageArr.length > 0) {
                if (messageArr[messageArr.length - 1].senderID !== sender) {
                    if (!messageArr[messageArr.length - 1].read) {
                        this.props.updateReceipt(messageArr[messageArr.length - 1]);
                    }
                }
                else {
                    if (messageArr[messageArr.length - 1].read && !messageArr[messageArr.length - 1].invisible) {
                        isRead = true;
                        var tmp = messageArr[messageArr.length - 1].date.toDate();
                        var hours = tmp.getHours();
                        var AMPM = " AM";
                        if (hours >= 12) {
                            AMPM = " PM";
                            hours -= 12;
                        }
                        else if (hours === 0) {
                            hours = 12;
                        }

                        readDate = "Seen: " + hours + ":" + tmp.getMinutes() + AMPM + " on " + (tmp.getMonth()+1) + "/" + (tmp.getDay()+1) + "/" + tmp.getFullYear();
                        console.log(readDate);

                    }
                }
            }
        }

        this.setState({
            messageArr: messageArr,
            isRead: isRead,
            readDate: readDate
		})
        
        //console.log(messageArr);
    }
    
	redirectWelcome = () => {
		this.props.history.push('/')
	}

    render() {
		const { messages } = this.props
		const { auth } = this.props
		const { pathname } = this.props.location
        if (auth.uid) {
            if ((messages != null && typeof(messages) !== 'undefined' && this.state.updatable)) {
			    this.setState({ updatable: false })
                this.loadMessages(pathname, messages, auth);
                if (this.state.firstUpdatable === 2) {
                    setTimeout(function(){
                        this.setState({ updatable: true })
                    }.bind(this), 0);
                }
                else {
                    setTimeout(function(){
                        this.setState({ updatable: true })
                    }.bind(this), 1000);
                }
            }      

            let out = []
            this.state.messageArr.forEach(function(item) {
                
                if (item.senderID === this.state.senderID) {
                    out.push( <div style={{marginTop: "8px", marginBottom: "8px"}} key={item.id} className="send" align="left">
                        <label><b style={{color: "#AFAFAF"}}>{this.state.senderEmail}</b></label>
                        <p style={{marginTop: "0px", marginBottom: "0px", whiteSpace: "pre-line"}}>{item.text}</p>
                    </div> )
                }
                else {
                    out.push( <div style={{marginTop: "8px", marginBottom: "8px"}} key={item.id} className="receive" align="right">
                        <label><b style={{color: "#7F7F7F"}}>{this.state.receiverEmail}</b></label>
                        <p style={{marginTop: "0px", marginBottom: "0px", whiteSpace: "pre-line"}}>{item.text}</p>
                    </div> )
                }

            }.bind(this))

            return (
		    	<div align="center">
		    	  <form onSubmit={this.handleSubmit} className="white">   
			        <div className="container" style={{width: "450px"}} align="left">
			          <h2 style={{marginTop: "0px", marginBottom: "30px", fontSize: 18}} align="center">{this.state.receiverEmail}</h2>
                      {out}
                      {this.state.isRead ? <span style={{color: "gray", whiteSpace: "pre-line", float: "right", marginTop: "-9px", marginBottom: "0px", marginRight: "0px", fontSize: 12}}>{this.state.readDate}</span> : ''}
			          <br/>
			          <button className="sendbtn" onClick={this.submitPost} >Send</button>
			          <textarea id="text" placeholder="Enter New Message" onKeyDown={this.keyPressed} name="textdesc" value={this.state.text} required="" style={{resize: "none", maxHeight: "100px", minHeight: "100px", width: "77%"}} onChange={this.handleChange}/>
			        </div>
			      </form>
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
		messages: state.firestore.ordered.messages
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        addMessage: (message) => dispatch(addMessage(message)),
        addFirstMessage: (message) => dispatch(addFirstMessage(message)),
        removeFalseMessage: (message) => dispatch(removeFalseMessage(message)),
        updateReceipt: (message) => dispatch(updateReceipt(message))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'messages' }
    ])
	)(Messaging);