
export const giveRating = (rating) => {
    console.log("HI?!?!?!?!");
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const doc = firestore.collection('users').doc(uid).get();
        // Get rating
        // Get num of ratings
        // Increase num of ratings
        // ( Rating + new_Rating ) / 
        // we here?!
        firestore.collection('users').doc(uid).update({
            totalNumberOfRatings: doc.data().totalNumberOfRatings + 1,
            totalOfRatings: doc.data().totalOfRatings + rating,
        });
    }
}

export const getFollowed = () => {
    console.log("HI?!?!?!?!");

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        let doc = firestore.collection('users').doc(uid).get();

    }
}

export const getFollowing = () => {
    console.log("HI?!?!?!?!");

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        let doc = firestore.collection('users').doc(uid).get();

    }
}