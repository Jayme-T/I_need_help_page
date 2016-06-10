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

    var commentsList = document.getElementById('posts-list');

    var button = document.getElementById('press');
    button.addEventListener('click', function() {

        var info = document.getElementById('textarea');
        if (document.getElementById('textarea').value !==''){
        firebaseDatabase.createNewComment(POST_ID, info.value);

        document.querySelector('textarea').value="";
        window.scrollTo(1500, 1530);
      }
      else {
        new Notification('error', "Please add a comment before hitting submit", 1500)
    }


    });

    console.log("pid: ", POST_ID);
    firebaseDatabase.fetchSinglePost(POST_ID, function(data) {
      //  console.log("post data: ", data);
        document.querySelector('#title').innerHTML = data.title;
        document.querySelector('#title').style.textAlign="center";
        document.querySelector('#body').innerHTML = data.body;
        document.querySelector('#body').style.textAlign="center"
        //should we create a comments object the key is the pid and then
        //the value is an array of comments?
        //then we could set or comments div equal to each element of the array
        //associated with the pid at hand?

        //document.querySelector('#comments')=
    });
    //
    firebaseDatabase.fetchAllComments(POST_ID, function(data) {
        if (!data) {
            removeLoadingSpinner(commentsList);
        }

        // //console.log("comments from post " + POST_ID + ": ", data);
        //
        // //for (var keys in data) {
        //     //console.log(keys);
        //   //  console.log("data: ", data[keys]["body"]);
        //   var keyArray=Object.keys(data);
        //   console.log(keyArray);
        //   for (var key in data){
        //     keyArray.push=(key);
        //     console.log(keyArray);
        //   }
        //   for (var i=0; i<keyArray.length; i++){
        //   var p = document.createElement("p");
        //   var node = document.createTextNode(data[keyArray[i]]["body"]);
        //   // p.className="paragraph" + i;
        //   p.appendChild(node);
        //   document.body.appendChild(p);
        // }
        // }

    });


// <div class="posts">
//     <ul id="posts-list" class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></ul>
// </div>

    // var count = 0;
    function addToList(item) {

        removeLoadingSpinner(commentsList);

        var listItem = document.createElement('li');
            listItem.className ="list-item";
            listItem.data = item;

            var body = document.createElement("p");
                body.className = "item-text";
                body.innerHTML = item.body;
            // var node = document.createTextNode(item.body);
            listItem.appendChild(body);

        commentsList.appendChild(listItem);


        // var listitem = document.createElement('li');
        // listitem.className = "list-item";
        // listitem.data = item; //necessary! to hold data
        //
        // var itemTextBox = document.createElement('div');
        //     itemTextBox.className = "item-text-box";
        //     var itemTitle = document.createElement('h3');
        //     itemTitle.className = 'item-text';
        //     itemTitle.innerHTML = item.title;
        // itemTextBox.appendChild(itemTitle);

    }

    firebaseDatabase.onCommentAdded(POST_ID, addToList);


    function removeLoadingSpinner(elem) {
        // loading fa fa-spinner fa-pulse fa-3x fa-fw
        elem.classList.remove('loading');
        elem.classList.remove('fa');
        elem.classList.remove('fa-spinner');
        elem.classList.remove('fa-pulse');
        elem.classList.remove('fa-3x');
        elem.classList.remove('fa-fw');
    }


}
