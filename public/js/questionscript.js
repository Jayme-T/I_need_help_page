'use strict';
var config = {
    apiKey: "AIzaSyB-Yv2W_XARpu5sx1l9BDXaQ2SNTmIB0tc",
    authDomain: "helpwithx.firebaseapp.com",
    databaseURL: "https://helpwithx.firebaseio.com",
    storageBucket: "helpwithx.appspot.com",
};
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("User Currently Signed in: ", user);
        //route to posts
        runApp(user);
    } else {
        //console.log("No user signed in: ", user);
        //route to login page
        window.location.assign('/auth/login.html');

    }
});

function runApp(user){
    var firebaseDatabase = new FirebaseDatabase(user.uid);
    
    var pid = window.location.search.substring(1, window.location.search.length);
    console.log("pid: ", pid);
    firebaseDatabase.fetchSinglePost(pid, function(data) {
        console.log("post data: ", data);
    });


}
