export const giveRating = (rating, id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        /*firestore.collection('users').doc(uid).update({
            bio: bio
        })*/
    }
}