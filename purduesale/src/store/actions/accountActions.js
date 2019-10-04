export const editBio = (bio) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').doc(firebase.auth().currentUser.uid).update({
            bio: bio
        })
    }
}

export const editImgUrl = (imgUrl) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').doc(firebase.auth().currentUser.uid).update({
            imageUrl: imgUrl
        })
    }
}