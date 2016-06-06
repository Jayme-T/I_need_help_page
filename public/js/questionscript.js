'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-Yv2W_XARpu5sx1l9BDXaQ2SNTmIB0tc",
    authDomain: "helpwithx.firebaseapp.com",
    databaseURL: "https://helpwithx.firebaseio.com",
    storageBucket: "helpwithx.appspot.com",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //console.log("User Currently Signed in: ", user);
        //route to posts
        runApp(user);
    } else {
        //console.log("No user signed in: ", user);
        //route to login page
        window.location.assign('/auth/login.html');
    }
});

function runApp(user) {
var windowPid = window.location.search.split("?");
//the below console log it the actual PID that will be found
//in the database and we need to post the body associated with this pid
console.log(windowPid[1].toString());
}
