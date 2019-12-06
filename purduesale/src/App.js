import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css';

import Sidebar from './components/navbar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Login from './components/auth/Login.js';
import Logout from './components/auth/Logout.js';
import SignUp from './components/auth/Signup';
import PostProduct from './components/dashboard/PostProduct';
import EditProduct from './components/dashboard/EditProduct';
import Profile from './components/dashboard/Dashboard'
import ForgotPass from './components/auth/ForgotPass';
import ResetPassword from './components/auth/ResetPassword';
import EditBio from './components/auth/EditBio';
import UserList from './components/dashboard/UserList';
import MyFollowers from './components/dashboard/MyFollowers';
import MyFollowing from './components/dashboard/MyFollowing';
import UserDetails from './components/dashboard/UserDetails';
import ProductDetails from './components/dashboard/ProductDetails';
import Faq from './components/dashboard/Faq';
import EditImgUrl from './components/auth/EditImgUrl';
import GiveRating from './components/dashboard/GiveRating';
import Home from './components/dashboard/Home'
import MyProducts from './components/dashboard/MyProducts';
import Settings from './components/dashboard/Settings';
import Inbox from './components/dashboard/Inbox';
import Messaging from './components/dashboard/Messaging';
import SubscribedProducts from './components/dashboard/SubscribedProducts';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      currentUser: null,
    };
 
  }

render() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/signup' component={SignUp} />
          <Route path='/faq' component={Faq} />
          <Route path='/postproduct' component={PostProduct} />
          <Route path='/editproduct/:id' component={EditProduct} />
          <Route path='/user/faq' component={Faq} />
          <Route path='/profile' component={Profile} />
          <Route path='/forgotpass' component={ForgotPass} />
          <Route path='/resetpass' component={ResetPassword} />
          <Route path='/editbio' component={EditBio} />
          <Route path='/editimgurl' component={EditImgUrl} />
          <Route path='/userlist' component={UserList} />
          <Route path='/myfollowers' component={MyFollowers} />
          <Route path='/myfollowing' component={MyFollowing} />
          <Route path='/myproductlist' component={MyProducts} />
          <Route path='/subscribedproducts' component={SubscribedProducts} />
          <Route path='/user/userlist' component={UserList} />
          <Route path='/user/:id' component={UserDetails} />
          <Route path='/product/:id' component={ProductDetails} />
          <Route path='/messages/:id' component={Messaging} />
          <Route path='/rate' component={GiveRating}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/inbox' component={Inbox}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
