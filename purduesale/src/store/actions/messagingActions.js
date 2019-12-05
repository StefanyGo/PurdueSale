export const addMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').doc(message.senderID).get().then(function(doc) {
            if (doc.exists) {
            }
            else {
                console.log("Document does not exist!");
            }
        }).catch(function(error) {
            console.log("Error with document!:", error);
        }).then(function() {
            firestore.collection('users').doc(message.receiverID).get().then(function(doc) {
                if (doc.exists) {
                    const datePosted = firebase.firestore.Timestamp.fromDate(new Date());

                    firestore.collection('messages').add({
                        messageID: message.messageID,
                        senderID: message.senderID,
                        receiverID: message.receiverID,
                        senderEmail: message.senderEmail,
                        receiverEmail: message.receiverEmail,
                        text: message.text,
                        date: datePosted,
                        invisible: false
                    })
                }
                else {
                    console.log("Document does not exist!");
                }
            }).catch(function(error) {
                console.log("Error with document!:", error);
            });
        });
    }
}

export const addFirstMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('users').doc(message.senderID).get().then(function(doc) {
            if (doc.exists) {
            }
            else {
                console.log("Document does not exist!");
            }
        }).catch(function(error) {
            console.log("Error with document!:", error);
        }).then(function() {
            firestore.collection('users').doc(message.receiverID).get().then(function(doc) {
                if (doc.exists) {
                    const datePosted = firebase.firestore.Timestamp.fromDate(new Date());

                    firestore.collection('messages').add({
                        messageID: message.messageID,
                        senderID: message.senderID,
                        receiverID: message.receiverID,
                        senderEmail: message.senderEmail,
                        receiverEmail: doc.data().email,
                        text: "",
                        date: datePosted,
                        invisible: true
                    })
                }
                else {
                    console.log("Document does not exist!");
                }
            }).catch(function(error) {
                console.log("Error with document!:", error);
            });
        });
    }
}

export const removeFalseMessage = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firestore.collection('messages').doc(message.id).delete();
    }
}