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
export const getUsers = (users, contacts) => {

    let names = [];
    if (users != null && typeof(users) !== 'undefined' ) {
        let i = 0;
        let j = 0;
        for (i = 0; i < users.length; i++) {
            for (j = 0; j < contacts.length; j++) {
                if (users[i].id == contacts[j]) {
                    let name = users[i].firstName + " " + users[i].lastName;
                    names.push(name);
                }

            }
        }

        return names;
    }
  }

  export const print = (printable) => {
      console.log(printable);
  }
