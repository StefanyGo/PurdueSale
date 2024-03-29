export const editBio = (bio) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        console.log("editbioinside")
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

export const giveRating = (rating) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        //const uid = firebase.auth().currentUser.uid;
        const link = window.location.href;
        var fields = link.split('/');

        firestore.collection('users').doc(fields[4]).get().then(function(doc) { 
        firestore.collection('users').doc(fields[4]).update({
            totalNumberOfRatings: doc.data().totalNumberOfRatings + 1,
            totalOfRatings: parseFloat(doc.data().totalOfRatings) + parseFloat(rating)
        });
    });
    }
}

export const addFollower = (email) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("addFollowerinside")
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const link = window.location.href;
        var fields = link.split('/');

        firestore.collection('users').doc(uid).get().then(function(doc) { 
            firestore.collection('users').doc(uid).update({
                numFollowing: doc.data().numFollowing + 1,
                following: [...doc.data().following, email]
            });
        });

        firestore.collection('users').doc(fields[4]).get().then(function(doc) { 
            firestore.collection('users').doc(fields[4]).update({
                numFollowers: doc.data().numFollowers + 1,
                followers: [...doc.data().followers, firebase.auth().currentUser.email]
            });
        });
    }
}

export const removeFollower = (email) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("addFollowerinside")
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const link = window.location.href;
        var fields = link.split('/');

        firestore.collection('users').doc(uid).get().then(function(doc) { 
            const elements = [...doc.data().following];
            const results = elements.filter(element => element.indexOf(email));
            firestore.collection('users').doc(uid).update({
                numFollowing: doc.data().numFollowing - 1,
                following: [...results]
            });
        });

        firestore.collection('users').doc(fields[4]).get().then(function(doc) { 
            const elements = [...doc.data().followers];
            const results = elements.filter(element => element.indexOf(email));
            firestore.collection('users').doc(fields[4]).update({
                numFollowers: doc.data().numFollowers - 1,
                followers: [...results]
            });
        });
    }
}

export const addNewProduct = (newProduct) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
     const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                const datePosted = firebase.firestore.Timestamp.fromDate(new Date());
                firestore.collection('users').doc(uid).collection('products').doc(doc.data().totalProducts.toString()).set({
                    productName: newProduct.productName,
                    description: newProduct.description,
                    date: datePosted,
                    tag: newProduct.tag,
                    imageUrl: newProduct.imgUrl,
                    status: "Available",
                    posterName: doc.data().firstName + " " + doc.data().lastName,
                    posterEmail: doc.data().email
                })
                const tagName = doc.data().email + "_" + doc.data().totalProducts;
                firestore.collection('products').doc(newProduct.tag).set({
                    [tagName]: firestore.doc("users/" + uid + "/products/" + doc.data().totalProducts)
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

