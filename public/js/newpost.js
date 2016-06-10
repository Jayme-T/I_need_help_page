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
      if (document.getElementById('body').value !=='' && document.getElementById('title').value !=='') {
        console.log("maybe?");
        firebaseDatabase.createNewPost(subjectInput.value, bodyInput.value, function() {
            //when done saving
            //console.log("here??")
            window.location.assign("/index.html");
        });

      }
        else{
          new Notification('error', 'Questions must have titles and bodies', 2000);
        }
    });


    var time = setTimeout(function() {}, 300000);
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
        console.log("snap: ", snap.val());
        clearTimeout(time);
        if (snap.val() === true) {
            time = setTimeout(function() {
                new Notification('success', 'You are now connected to the internet');
            }, 1000);
        } else {
            time = setTimeout(function() {
                new Notification('error', 'You have lost internet connection, but fear not, we will save your data and sync it when you come back online!');
            }, 1000);
        }
    });



}
