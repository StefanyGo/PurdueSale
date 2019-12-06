export const addNewProduct = (newProduct) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        firestore.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                const tagName = doc.data().email + "_" + doc.data().totalProducts;
                const datePosted = firebase.firestore.Timestamp.fromDate(new Date());
                		
			    var toDec = newProduct.price;
		    	var index = toDec.indexOf(',');
		    	while (index >= 0) {
		    		toDec = toDec.substring(0, index) + toDec.substring(index + 1);
		    		index = toDec.indexOf(',');
		    	}
                
                firestore.collection('products').doc(tagName).set({
                    productName: newProduct.productName,
                    description: newProduct.description,
                    date: datePosted,
                    tag: newProduct.tag,
                    price: newProduct.price,
                    decPrice: parseFloat(toDec.substring(1)),
                    imageUrl: newProduct.imgUrl,
                    status: "Available",
                    posterName: doc.data().firstName + " " + doc.data().lastName,
                    posterEmail: doc.data().email,
                    uid: uid,
                    oncampus: newProduct.oncampus,
                    userProductID: doc.data().totalProducts.toString(),
                    isTextbook: newProduct.isTextbook,
                    textbookCourse: newProduct.textbookCourse,
                    followers: [],
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

export const followProduct = (email, product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const tagName = product.posterEmail + "_" + product.userProductID

        firestore.collection('products').doc(tagName).get().then(function(doc) { 
            firestore.collection('products').doc(tagName).update({
                followers: [...doc.data().followers, email]
            });
        });
    }
}

export const unfollowProduct = (email, product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;
        const tagName = product.posterEmail + "_" + product.userProductID

        firestore.collection('products').doc(tagName).get().then(function(doc) { 
            const elements = [...doc.data().followers];
            const results = elements.filter(element => element.indexOf(email));
            firestore.collection('products').doc(tagName).update({
                followers: [...results]
            });
        });
    }
}

export const editProduct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = firebase.auth().currentUser.uid;

        var toDec = product.price;
        var index = toDec.indexOf(',');
        while (index >= 0) {
            toDec = toDec.substring(0, index) + toDec.substring(index + 1);
            index = toDec.indexOf(',');
        }

        firestore.collection('users').doc(uid).get().then(function(doc) {
            if (doc.exists) {
                const tagName = doc.data().email + "_" + product.userProductID;
                firestore.collection('products').doc(tagName).update({
                    productName: product.productName,
                    description: product.description,
                    tag: product.tag,
                    price: product.price,
                    decPrice: parseFloat(toDec.substring(1)),
                    status: product.status,
                    oncampus: product.oncampus,
                    isTextbook: product.isTextbook,
                    textbookCourse: product.textbookCourse
                })
                if (!product.previousSold && product.status === "Sold") {
                    firestore.collection('users').doc(uid).update({
                        sellingProducts: doc.data().sellingProducts - 1,
                        soldProducts: doc.data().soldProducts + 1,
                    });
                    firestore.collection('notifications').doc(tagName).set({
                        message: product.productName + " sold by " + product.posterName + " has been sold.",
                        followers: [...product.followers],
                        time: firebase.firestore.Timestamp.fromDate(new Date()),
                    })
                }
                
                else if (product.previousSold && product.status !== "Sold") {
                    firestore.collection('users').doc(uid).update({
                        sellingProducts: doc.data().sellingProducts + 1,
                        soldProducts: doc.data().soldProducts - 1,
                    })
                    firestore.collection('notifications').doc(tagName).set({
                        message: product.productName + " sold by " + product.posterName + " is no longer being sold.",
                        followers: [...product.followers],
                        time: firebase.firestore.Timestamp.fromDate(new Date()),
                    })
                }
                else if (!product.previousSold && product.status === "Removed"){
                    firestore.collection('users').doc(uid).update({
                        sellingProducts: doc.data().sellingProducts - 1,
                    })
                    firestore.collection('notifications').doc(tagName).set({
                        message: product.productName + " sold by " + product.posterName + " has been removed.",
                        followers: [...product.followers],
                        time: firebase.firestore.Timestamp.fromDate(new Date()),
                    })
                }
                else if (product.previousSold && product.status === "Removed"){
                    firestore.collection('users').doc(uid).update({
                        soldProducts: doc.data().soldProducts - 1,
                    })
                    firestore.collection('notifications').doc(tagName).set({
                        message: product.productName + " sold by " + product.posterName + " has been removed.",
                        followers: [...product.followers],
                        time: firebase.firestore.Timestamp.fromDate(new Date()),
                    })
                }
            } else {
                console.log("Document does not exist!");
            }
        }).catch(function(error) {
            console.log("Error with document!:", error);
        });
    }
}