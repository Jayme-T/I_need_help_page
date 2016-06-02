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
    console.log("User Currently Signed in: ", user);
    //route to posts
    runApp(user);
  } else {
    console.log("No user signed in: ", user);
    //route to login page
    window.location.assign('/auth/login.html');
  }
});

function runApp(user) {
    console.log("user: ", user);
    var firebaseDatabase = new FirebaseDatabase(user.uid);


    //main app code here
    document.querySelector('#press').addEventListener('click', userClicksAButton);

    function userClicksAButton() {
      console.log('test');

    	var inputtedData = {
    		title: document.querySelector('#title'),
    		body: document.querySelector('textarea')
    	};
    console.log(inputtedData);
    	// Post.createNew(inputtedData);
    }

}
