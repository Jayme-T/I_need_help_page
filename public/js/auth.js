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
        var linkToHome = '<a href="/index.html">here</a>';
        new Notification('success', 'You are signed in. Click ' + linkToHome + ' to go home.', 3000);
    } else {
        console.log("No user signed in: ", user);
        var linkToLogin = '<a href="/auth/login.html">login</a>';
        var linkToRegister = '<a href="/auth/login.html">register</a>';
        // new Notification('error', 'No user currently signed in. Please '+linkToLogin+' or '+linkToRegister+'.', 3000);
    }
});


function handleLogin(e) {
    // e.preventDefault();
    // console.log("here?")
    var currButtonHTML = loadingButton(e.target);
    var currUser = {
        email: loginInputs_email.value,
        password: loginInputs_password.value
    }
    firebase.auth().signInWithEmailAndPassword(currUser.email, currUser.password)
        .then(function() {
            resetLoadingButton(e.target, currButtonHTML);
            routeTo('/index.html');
        }, function(error) {
            // Handle Errors here.
            resetLoadingButton(e.target, currButtonHTML);
            console.log("errors: ", error.code, error.message);
            new Notification('error', error.message, 3000);
        });
}

function handleRegister(e) {
    var currButtonHTML = loadingButton(e.target);
    var currUser = {
        email: registerInputs_email.value,
        password: registerInputs_password.value
    };
    firebase.auth().createUserWithEmailAndPassword(currUser.email, currUser.password)
        .then(function() {
            resetLoadingButton(e.target, currButtonHTML);
            routeTo('/auth/login.html');
        }, function(error) {
            // Handle Errors here.
            resetLoadingButton(e.target, currButtonHTML);
            console.log("errors: ", error.code, error.message);
            new Notification('error', error.message, 3000);
        });
}


function routeTo(path) {
    window.location.assign(path);
}

function loadingButton(btn) {
    var currStr = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
    btn.style.fontSize = "9px";
    return currStr;
}
function resetLoadingButton(btn, resetStr) {
    btn.innerHTML = resetStr;
    btn.style.fontSize = null;
}
