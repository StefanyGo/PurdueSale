import React , { Component }  from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import ProductSummary from './ProductSummary'
import Filter from './Filter'

class MyMessagesList extends Component {
    state = {
        search: '',
        sort:'',
        sortedProd:'',
        tag:'',
        loc:'',
    };
    

    onChange = e => {
        this.setState({search: e.target.value.substr(0, 20)});
    }

    handleChangeSort = e => {
        this.setState({sort: e.target.value});
    }

    handleChangeTag = e => {
        this.setState({tag: e.target.value});
    }

    handleChangeLocation = e => {
        this.setState({loc: e.target.value})
    }


    listMessages(messages){
        const { sort } = this.state;
        const { tag } = this.state;
        const { loc } = this.state;
        const { user } = this.props;
        console.log(user);
        let filteredProducts = products;

        if (sort !== ''){
            filteredProducts.sort((a,b)=>(sort==='lowest')? (a.decPrice > b.decPrice?1:-1): (a.decPrice < b.decPrice?1:-1))
        } else {
            filteredProducts.sort((a,b)=>(a.productName<b.productName?1:-1));
        };

        if (tag != ''){
            filteredProducts = filteredProducts.filter(
                product => {
                    return product.tag.toLowerCase().indexOf(tag.toLowerCase()) !== -1
                }
            );
        }

        if (loc != ''){
            if (loc === "true") {
                filteredProducts = filteredProducts.filter(
                    product => {
                        return product.oncampus == 1
                    }
                )
            } else {
                filteredProducts = filteredProducts.filter(
                    product => {
                        return product.oncampus == 0
                    }
                )
            }
            
        }
        return filteredProducts;
    }

    render(){
        const { messages } = this.messages;
        const { user } = this.props;
        let filteredMessages;
        if (!messages) {
            filteredMessages = messages;
        } else {
            console.log(user.email)
            filteredMessages = this.listMessages(messages)
            filteredMessages = filteredMessages.filter(
                message => {
                    console.log(message.senderEmail);
                    console.log(message.receiverEmail);
                    console.log(message.text);
                    return message.receiverEmail.toLowerCase().indexOf(user.email) !== -1
                }
            );
        }
        return (
            <div>
                <div class="row">
                    { filteredMessages && filteredMessages.map(message => {
                        return (
                            <Link to={{
                                pathname: "/editproduct/" + message.senderEmail,
                            }}>
                                <div class="col s3" key={message.messageID}>
                                <MessageSummary message={message}/>
                                </div>
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        messages: state.firestore.ordered.messages,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'messages' }
    ])
)(MyMessagesList)