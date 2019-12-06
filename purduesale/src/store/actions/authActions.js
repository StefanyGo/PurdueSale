import swal from 'sweetalert'

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        if (credentials.remember === true) {
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
        if (newUser.remember === true) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                firebase.auth().createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password
                ).then((resp) => {
                    const uid = resp.user.uid;
                    return firestore.collection('users').doc(uid).set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0] + newUser.lastName[0],
                        email: newUser.email,
                        imageUrl: '',
                        bio: '',
                        sellingProducts: 0,
                        soldProducts: 0,
                        totalProducts: 0,
                        totalOfRatings: 0,
                        totalNumberOfRatings: 0,
                        numFollowing: 0,
                        numFollowers: 0,
                        followers: [],
                        following: []
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
                    const uid = resp.user.uid;
                    return firestore.collection('users').doc(uid).set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        initials: newUser.firstName[0] + newUser.lastName[0],
                        email: newUser.email,
                        imageUrl: '',
                        bio: '',
                        sellingProducts: 0,
                        soldProducts: 0,
                        totalProducts: 0,
                        totalOfRatings: 0,
                        totalNumberOfRatings: 0,
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

export const forgotPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            dispatch({ type: 'FORGET_PASSWORD_SUCCESS' });
            swal("Password reset email sent!")
        }, (error) => {
            dispatch({ type: 'FORGET_PASSWORD_ERROR' });
            swal("Oh no!", error.message, "error")
        });
    }
}

const reauthenticate = (firebase, currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

export const resetPassword = (pass1, pass2) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        reauthenticate(firebase, pass1).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(pass2).then(() => {
            swal("Success!", "Password successfully changed!", "success")
          }).catch((error) => { swal("Oh no!", error.message, "error")
        });
        }).catch((error) => { swal("Oh no!", error.message, "error")
      });
    }
}
