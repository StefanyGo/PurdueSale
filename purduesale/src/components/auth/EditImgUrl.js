import './Login.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { editImgUrl } from '../../store/actions/accountActions'
//import userlogo1 from '../dashboard/userlogo1.png'
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
        const rnd = uuidv4();

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
			    <div className="container" style={{width: "350px"}} align="left">
                <h6 align="center">Edit Profile Image </h6>
                <br/>
                  {/*<img src={this.state.imgUrl || userlogo1} alt="Uploaded images" height="150" width="182" style={{float: "center"}}/>*/}
                  <br/>
                  <input type="file" onChange={this.handleChange} />
			      <br/><br/>
			      <button onClick={this.handleSubmit} type="submit" >Update Image</button>
                  <button className="cancelbtn" onClick={this.deletePicture} align="right">Remove</button>

			    </div>
			</div>

        )
    }
}

export function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        editImgUrl: (imgUrl) => dispatch(editImgUrl(imgUrl))
    }
}

export default connect(null, mapDispatchToProps)(EditImgUrl);