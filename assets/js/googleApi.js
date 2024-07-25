
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqlwsKElxJPK7VEiKP9714zxzb02V9VU0",
  authDomain: "findway-f73e7.firebaseapp.com",
  projectId: "findway-f73e7",
  storageBucket: "findway-f73e7.appspot.com",
  messagingSenderId: "345912590084",
  appId: "1:345912590084:web:b8a1a03eb281a7be9a9a51"
};

// albertcanada312@gmail.com


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider()

const signInButton = document.getElementById("signInButton");
const signIn = document.getElementById("signIn");
const signOutButton = document.getElementById("signOutButton");
const userName = document.getElementById("username");
const userEmail = document.getElementById("email");



signOutButton.style.display = "none";

const userSignOut = async() => {
  signOut(auth).then(() => {
      alert("You have signed out successfully!");
      window.location.href = "http://localhost:3000/login.html";
  }).catch((error) => {})
}

const userSignIn = async(e) => {
e.preventDefault();
try {
const result = await signInWithPopup(auth, provider);
    const user = result.user
      const res = await fetch('/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      window.location.href = "http://localhost:3000/loginc.html";
    } catch (error) {
      console.log('could not login with google', error);
    }
  }

  
 


onAuthStateChanged(auth, (user) => {
  if(user) {
    console.log(user)
    signOutButton.style.display = "block";
    userName.innerHTML = user.displayName;
    userEmail.innerHTML = user.email
    // signIn.innerHTML = "LogOut"
  } else {
    signOutButton.style.display = "none";
    // signIn.style.display = "none";
    signIn.innerText = "Login"
  }


})





signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);




