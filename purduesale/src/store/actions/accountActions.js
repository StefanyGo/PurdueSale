export const editBio = (bio) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(uid).update({
            bio: bio
        })
    }
}

export const editImgUrl = (imgUrl) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(uid).update({
            imageUrl: imgUrl
        })
    }
}

export const addNewProduct = (newProduct) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                firestore.collection('users').doc(uid).collection('products').doc(doc.data().totalProducts.toString()).set({
                    productName: newProduct.productName,
                    description: newProduct.description,
                    date: firebase.firestore.Timestamp.fromDate(new Date()),
                    tags: "TODO (array)",
                    imageUrl: "TODO (reference)",
                    status: "Available",
                    posterName: doc.data().firstName + " " + doc.data().lastName,
                    posterEmail: doc.data().email
                })
                firestore.collection('users').doc(uid).update({
                    sellingProducts: doc.data().sellingProducts + 1,
                    totalProducts: doc.data().totalProducts + 1
                })
            } else {
                console.log("Document does not exist!");
            }
        }).catch(function(error) {
            console.log("Error with document!:", error);
        });
    }
}