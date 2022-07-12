import "./styles.css"
import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
    query, where, orderBy, serverTimestamp, getDoc,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC3sb-4uopFNb7KnPWt1O0iRWOtU8CVajs",
    authDomain: "fir-9-dojo-a9076.firebaseapp.com",
    projectId: "fir-9-dojo-a9076",
    storageBucket: "fir-9-dojo-a9076.appspot.com",
    messagingSenderId: "981504752344",
    appId: "1:981504752344:web:723d49b47a3372ff6fb5ad"
};


// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books")

// queries

const q = query(colRef, orderBy("createdAt"))

//get collection data

onSnapshot(q, (snapshot) => {
    console.log("snapshot docs:", snapshot.docs);
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log("books:", books)

})




// adding documents

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset();
        })

})

//deleting documents

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const docRef = doc(db, "books", deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})


//get a single document 

// const docRef = doc(db, "books", "iIt2DHvr3LTsuDco3YJ6")

// getDoc(docRef)
//     .then((doc) => console.log(doc.data(), doc.id))