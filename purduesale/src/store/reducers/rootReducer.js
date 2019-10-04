import authReducer from './authReducer'
import productReducer from './productReducer'
import userListReducer from './userListReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    user: userListReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer