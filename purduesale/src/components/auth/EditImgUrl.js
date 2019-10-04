import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { editImgUrl } from '../../store/actions/accountActions'
import userlogo1 from '../dashboard/userlogo1.png'
import { storage } from '../../config/fbConfig.js';

class EditImgUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imgUrl: '',
            dimensions: null
        }
       /* const tmp = props.auth.uid ? (<img className="Avatar" src={this.props.profile.imageUrl || userlogo1} alt="UserLogo" width="200" height="150" />) 
        : 
        ( <div >
            Please login!
        </div> );*/
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
	
	handleChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }

    handleSubmit = () => {
        const {image} = this.state;
        const rnd = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

        console.log(rnd);

        const uploadTask = storage.ref(`images/${rnd}`).put(image);
        uploadTask.on('state_changed',
        (snapshot) => {

        }, (error) => {
            console.log(error);
        }, () => {
            storage.ref('images').child(rnd).getDownloadURL().then(imgUrl => {
                console.log(imgUrl);
                this.setState({imgUrl});
                this.props.editImgUrl(imgUrl)
                this.props.history.push('/profile')
            })
        })
    }
    
	redirectWelcome = () => {
		this.props.history.push('/')
    }
    
	deletePicture = () => {
        this.props.editImgUrl('')
		this.props.history.push('/profile')
    }
    
	redirectProfile = () => {
		this.props.history.push('/profile')
    }
    
    render() {
        return (
			<div align="center">
			  <button className="logobtn" onClick={this.redirectWelcome}></button>
			    <div className="container" style={{width: "350px"}} align="left">
			      <h2 style={{marginTop: "0px", marginBottom: "30px"}} align="center">Edit Image</h2>
                  {/*<img src={this.state.imgUrl || userlogo1} alt="Uploaded images" height="150" width="182" style={{float: "center"}}/>*/}
                  <input type="file" onChange={this.handleChange} />
			      <br/><br/><br/>
			      <button onClick={this.handleSubmit} type="submit" style={{width: "100%"}}>Update Image</button>
			      <br/>
			      <button onClick={this.deletePicture} type="submit" style={{width: "100%", backgroundImage: "linear-gradient(#DF4F4F, #9F2F2F)"}}>Remove Profile Picture</button>
			    </div>
			</div>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        editImgUrl: (imgUrl) => dispatch(editImgUrl(imgUrl))
    }
}

export default connect(null, mapDispatchToProps)(EditImgUrl);