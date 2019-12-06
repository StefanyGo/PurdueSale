import { lchmod } from "fs";


export const giveRating = (rating) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const doc = firestore.collection('users').doc(uid).get();

        firestore.collection('users').doc(uid).update({
            totalNumberOfRatings: doc.data().totalNumberOfRatings + 1,
            totalOfRatings: doc.data().totalOfRatings + rating,
        });
    }
}

// list of contacts
// generate list (from users)
// make them each links

export const getUsers = (contacts, messages) => {
    //console.log(messages);

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;

        let i = 0;
        for (i = 0; i < messages.length; i++) { 
            let message = messages[i];
            if (message.receiverID == uid) {
                if (contacts.indexOf(message.senderID) == -1) {
                    contacts.push(message.senderID);
                }
            } else if (message.senderID == uid) {
                if (contacts.indexOf(message.receiverID) == -1) {
                    contacts.push(message.receiverID);
                }
            }
        } 
    }
}