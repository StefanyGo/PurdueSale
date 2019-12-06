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
                    var arr = doc.data().unreads;

                    if (!arr.includes(message.senderID)) {
                        arr.push(message.senderID);
                        firestore.collection('users').doc(message.receiverID).update({
                            unreadsSize: arr.length,
                            unreads: arr
                        })
                    }

                    firestore.collection('messages').add({
                        messageID: message.messageID,
                        senderID: message.senderID,
                        receiverID: message.receiverID,
                        senderEmail: message.senderEmail,
                        receiverEmail: message.receiverEmail,
                        text: message.text,
                        date: datePosted,
                        invisible: false,
                        read: false,
                        readDate: datePosted
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
                        invisible: true,
                        read: true,
                        readDate: datePosted
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

export const updateReceipt = (message) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const datePosted = firebase.firestore.Timestamp.fromDate(new Date());

        firestore.collection('messages').doc(message.id).update({
            read: true,
            readDate: datePosted
        });

        firestore.collection('users').doc(message.receiverID).get().then(function(doc) {
            if (doc.exists) {
                var arr = doc.data().unreads;

                for (var i = arr.length - 1; i >= 0; --i)
                if (arr[i] === message.senderID) {
                    arr.splice(i, i+1);
                    firestore.collection('users').doc(message.receiverID).update({
                        unreadsSize: arr.length,
                        unreads: arr
                    })
                    break;
                }
            }
            else {
                console.log("Document does not exist!");
            }
        }).catch(function(error) {
            console.log("Error with document!:", error);
        });
    }
}
