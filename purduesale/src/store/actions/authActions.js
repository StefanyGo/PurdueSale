export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        if (credentials.remember == true) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                firebase.auth().signInWithEmailAndPassword(
                    credentials.email,
                    credentials.password
                ).then(() => {
                    dispatch({ type: 'LOGIN_SUCCESS'})
                }).catch((err) => {
                    dispatch({ type: 'LOGIN_ERROR', err });
                });
            })
        }
        else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                firebase.auth().signInWithEmailAndPassword(
                    credentials.email,
                    credentials.password
                ).then(() => {
                    dispatch({ type: 'LOGIN_SUCCESS'})
                }).catch((err) => {
                    dispatch({ type: 'LOGIN_ERROR', err });
                });
            })
        }
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        if (newUser.remember == true) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                firebase.auth().createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password
                ).then((resp) => {
                    return firestore.collection('users').doc(resp.user.uid).set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0] + newUser.lastName[0],
                        email: newUser.email,
                        imageUrl: '',
                        bio: '',
                        sellingProducts: 0,
                        soldProducts: 0
                    })
                }).then(() => {
                    dispatch({ type: 'SIGNUP_SUCCESS' })
                }).catch(err => {
                    dispatch({ type: 'SIGNUP_ERROR', err})
                })
            })
        }
        else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                firebase.auth().createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password
                ).then((resp) => {
                    return firestore.collection('users').doc(resp.user.uid).set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0] + newUser.lastName[0],
                        email: newUser.email,
                        imageUrl: '',
                        bio: '',
                        sellingProducts: 0,
                        soldProducts: 0
                    })
                }).then(() => {
                    dispatch({ type: 'SIGNUP_SUCCESS' })
                }).catch(err => {
                    dispatch({ type: 'SIGNUP_ERROR', err})
                })
            })
        }

    }

}