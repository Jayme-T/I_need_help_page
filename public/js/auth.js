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
    var linkToHome = '<a href="/index.html">here</a>'
    new Notification('success', 'You are signed in. Click ' + linkToHome + ' to go home.', "max");
  } else {
    console.log("No user signed in: ", user);
    var linkToLogin = '<a href="/auth/login.html">login</a>';
    var linkToRegister = '<a href="/auth/login.html">register</a>';
    new Notification('error', 'No user currently signed in. Please '+linkToLogin+' or '+linkToRegister+'.', 5000);
    //route to login
  }
});


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


function routeTo(path) {
    window.location.assign(path);
}
