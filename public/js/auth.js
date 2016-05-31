'use strict';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-Yv2W_XARpu5sx1l9BDXaQ2SNTmIB0tc",
  authDomain: "helpwithx.firebaseapp.com",
  databaseURL: "https://helpwithx.firebaseio.com",
  storageBucket: "helpwithx.appspot.com",
};
firebase.initializeApp(config);


var loginInputs_Email = document.getElementById("login-input-email");
var loginInputs_Password = document.getElementById("login-input-password");
var loginButton = document.getElementById("login-input-button");
    loginButton.addEventListener('click', handleLogin);



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user signed in: ", user);
    //route to posts
        // window.location.assign('/index.html');
    helps(user.uid);
  } else {
    console.log("no user signed in: ", user);
    //route to login
  }
});

// firebase.auth().createUserWithEmailAndPassword()

function handleLogin(e) {
    var currUser = {
        email: loginInputs_Email.value,
        password: loginInputs_Password.value
    }
    firebase.auth().signInWithEmailAndPassword(currUser.email, currUser.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errors: ", errorCode, errorMessage);
        // ...
    });
}

var help;
function helps(uid) {

    help = new Help(uid);
    console.log("help: ", help)

    help.createNew('New Post','This is the body of the post. Hello world!');


}

var posts = firebase.database().ref('user-posts').once('value').then(function(data) {
    console.log("data: ", data.val()); //this gets the values!!!!
});
