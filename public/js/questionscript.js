'use strict';

var firebase = firebase;
var FirebaseDatabase = FirebaseDatabase;
var Modal = Modal;

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

    var firebaseDatabase = new FirebaseDatabase(user.uid);

    var POST_ID = window.location.search.substring(1, window.location.search.length);

    var button = document.getElementById('press');
    button.addEventListener('click', function() {

        var info = document.getElementById('textarea');

        firebaseDatabase.createNewComment(POST_ID, info.value);

        document.querySelector('textarea').value="";
        window.scrollTo(1500, 1530);

    });

    console.log("pid: ", POST_ID);
    var firebaseDatabase = new FirebaseDatabase(user.uid);

    var POST_ID = window.location.search.substring(1, window.location.search.length);


    console.log("pid: ", POST_ID);
    firebaseDatabase.fetchSinglePost(POST_ID, function(data) {
        console.log("post data: ", data);
        document.querySelector('#title').innerHTML = data.title;
        document.querySelector('#body').innerHTML = data.body;
        //should we create a comments object the key is the pid and then
        //the value is an array of comments?
        //then we could set or comments div equal to each element of the array
        //associated with the pid at hand?

        //document.querySelector('#comments')=
    });



    // var commentBody = "Wow, that's a helluva problem you got! Good luck!";

    //this method creates a comment, parameters are the post id
    //and the comment body as a string
    // firebaseDatabase.createNewComment(POST_ID, commentBody);

    //this will return an array of all comments of a specific post id
    //or null if no comments
    //parameters are the post id, and a callback function to
    //run once comments have been fetched
    firebaseDatabase.fetchAllComments(POST_ID, function(data) {
        console.log("comments from post " + POST_ID + ": ", data);



    for (var keys in data) {
        //console.log(keys);
        console.log(data[keys]["body"]);
    }


  });


    //firebaseDatabase.fetchSinglePost

}
