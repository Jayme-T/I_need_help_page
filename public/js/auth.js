'use strict';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-Yv2W_XARpu5sx1l9BDXaQ2SNTmIB0tc",
  authDomain: "helpwithx.firebaseapp.com",
  databaseURL: "https://helpwithx.firebaseio.com",
  storageBucket: "helpwithx.appspot.com",
};
firebase.initializeApp(config);


var loginInputs_email = document.getElementById("login-input-email");
var loginInputs_password = document.getElementById("login-input-password");
var loginButton = document.getElementById("login-input-button");
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

var registerInputs_email = document.getElementById("register-input-email");
var registerInputs_password = document.getElementById("register-input-password");
var registerButton = document.getElementById("register-input-button");
    if (registerButton) {
        registerButton.addEventListener('click', handleRegister);
    }

var gotoRegister = document.getElementById('goto-register');
    if (gotoRegister) {
        gotoRegister.addEventListener('click', function() {
            routeTo('/auth/login.html');
        });
    }
var gotoLogin = document.getElementById('goto-login');
    if (gotoLogin) {
        gotoLogin.addEventListener('click', function() {
            routeTo('/auth/register.html');
        });
    }




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User Currently Signed in: ", user);
    //route to posts
        // routeTo('/index.html');
    // helps(user.uid);
  } else {
    console.log("No user signed in: ", user);
    //route to login

  }
});

// firebase.auth().createUserWithEmailAndPassword()

function handleLogin(e) {
    // e.preventDefault();
    // console.log("here?")
    var currUser = {
        email: loginInputs_email.value,
        password: loginInputs_password.value
    }
    firebase.auth().signInWithEmailAndPassword(currUser.email, currUser.password).catch(function(error) {
        // Handle Errors here.
        console.log("errors: ", error.code, error.message);
        alert(error.message);
        return; //don't route
    });
}

function handleRegister(e) {
    var currUser = {
        email: registerInputs_email.value,
        password: registerInputs_password.value
    };
    firebase.auth().createUserWithEmailAndPassword(currUser.email, currUser.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errors: ", errorCode, errorMessage);
        return; //don't route
        // ...
    });
    routeTo('/auth/login.html');
}

// var help;
// function helps(uid) {
//
//     help = new Help(uid);
//     console.log("help: ", help)
//
//     help.createNew('New Post','This is the body of the post. Hello world!');
//
// }
//
// var posts = firebase.database().ref('user-posts').once('value').then(function(data) {
//     console.log("data: ", data.val()); //this gets the values!!!!
// });


function routeTo(path) {
    window.location.assign(path);
}
