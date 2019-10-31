export const addNewProduct = (newProduct) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                const tagName = doc.data().email + "_" + doc.data().totalProducts;
                const datePosted = firebase.firestore.Timestamp.fromDate(new Date());
                firestore.collection('products').doc(tagName).set({
                    productName: newProduct.productName,
                    description: newProduct.description,
                    date: datePosted,
                    tag: newProduct.tag,
                    price: newProduct.price,
                    imageUrl: newProduct.imgUrl,
                    status: "Available",
                    posterName: doc.data().firstName + " " + doc.data().lastName,
                    posterEmail: doc.data().email,
                    uid: uid,
                    oncampus: newProduct.oncampus,
                    userProductID: doc.data().totalProducts.toString()
                })
                firestore.collection('users').doc(uid).collection('products').doc(doc.data().totalProducts.toString()).set({
                    productReference: firestore.doc("products/" + tagName)
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