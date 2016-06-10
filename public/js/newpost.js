'use strict';

var firebase = firebase;
var Modal = Modal;
var FirebaseDatabase = FirebaseDatabase;

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
    //console.log("user: ", user);
    var firebaseDatabase = new FirebaseDatabase(user.uid);

    var submitNewPost = document.getElementById('submit-form');
    var subjectInput = document.getElementById('title');
    var bodyInput = document.getElementById('body');
    submitNewPost.addEventListener('click', function() {
        firebaseDatabase.createNewPost(subjectInput.value, bodyInput.value, function() {
            //when done saving
            console.log("here??")
            window.location.assign("/index.html");
        });
    });


}
