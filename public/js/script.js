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
    //console.log("user: ", user);
    var firebaseDatabase = new FirebaseDatabase(user.uid);


    //main app code here



    var button = document.getElementById('press');
    button.addEventListener('click', function() {
        var title = document.getElementById("title");
        var body = document.querySelector('textarea');
        firebaseDatabase.createNewPost(title.value, body.value);
    });
    var postList = document.getElementById('posts-list');
    console.log(postList);

    function appendToList(item) {

        if (item.isFinished === true) {
            return;
        }
        var listitem = document.createElement('li');
        listitem.className = "list-item";
        listitem.data = item; //necessary! to hold data

        var rmv = document.createElement('i');
        rmv.className = "fa fa-times rmv";

        rmv.style.float = "left";
        rmv.addEventListener('click', removeFromList);

        var itemTitle = document.createElement('h3');
        itemTitle.className = 'item-text';
        itemTitle.innerHTML = item.title;
        //itemTitle.addEventListener('click', test);
        var itemBody = document.createElement('p');
        itemBody.className = 'item-text';
        itemBody.innerHTML = item.body;
        var itemPID = document.createElement('p');
        itemPID.className = 'item-text';
        itemPID.innerHTML = item.pid;

        var editButton=document.createElement('button');
        editButton.innerHTML="Edit";
        editButton.style.marginLeft="40px";
       editButton.addEventListener('click', edit);
        var CommentButton=document.createElement('button');
        CommentButton.innerHTML="Comment";
        CommentButton.style.marginLeft="40px";
         //CommentButton.addEventListner('click', comment());

        listitem.appendChild(rmv);
        listitem.appendChild(itemTitle);
        listitem.appendChild(editButton);
        listitem.appendChild(CommentButton);
        //listitem.appendChild(itemBody);



        //I will add an event listenter and if you click on a topic
        //you can see the whole questions and provide answers.
        //That way long questions don't take the entire page.

        //no need for people to see the PID
        //listitem.appendChild(itemPID);
        postList.appendChild(listitem);

        function removeFromList(e) {
            // console.log(e.target.parentElement.data.uid);
            // console.log(user.uid);
            //   console.log(itemUID.innerHTML);
            //   console.log(user);


            if (e.target.parentElement.data.uid !== user.uid) {
                new Notification('error', "can't remove a question you didn't write", 3000)

            } else {
                new Notification('success', 'question removed', 3000)

                firebaseDatabase.deletePost(e.target.parentElement.data.pid);
                // firebaseDatabase.setPostIsFinished(e.target.parentElement.data.pid);
                e.target.parentElement.remove();
            }

        }


    }


    firebaseDatabase.onPostAdded(appendToList);


    firebaseDatabase.onPostRemoved(function(data) {
        console.log("POST WAS REMOVED!: ", data);

    });

    firebaseDatabase.onPostUpdated(function(data) {
        console.log("POST WAS EDITED!: ", data);

    });
    function edit(e){
      if (e.target.parentElement.data.uid !== user.uid) {
          new Notification('error', "can't edit a question you didn't write", 3000)

      }
      else{
        document.querySelector('textarea').value=e.target.parentElement.data.body;
        document.querySelector('#title').value=e.target.parentElement.data.title;
        window.scrollTo(0, 0);
        firebaseDatabase.deletePost(e.target.parentElement.data.pid);
        // firebaseDatabase.setPostIsFinished(e.target.parentElement.data.pid);
        e.target.parentElement.remove();

      }

    }

    // function test(e){
    //   console.log(e.target.parentElement.data.body);
    //   var para=document.createElement('p');
    //   para.appendChild(e.target.parentElement.data.body);
    //   //e.target.parentElement.data.body
    // //e.target.data.('p.item-text').style.display="block";
    //   // listitem.appendChild(itemBody);
    // }


    //if url query has pid=slug, open modal with that info
    console.log("location: ", window.location);
    var querySlug = window.location.search;
    var currentPagePID = querySlug.substring(querySlug.indexOf("=") + 1, querySlug.length);
    console.log("currentPagePID: ", currentPagePID);
    if (currentPagePID !== "") {
        firebaseDatabase.fetchSinglePost(currentPagePID, function(post) {
            console.log("post: ", post);
            if (post) { //if post data is not null,
                //open modal
                var testTitle = document.createElement('h4');
                    testTitle.innerHTML = post.title;
                var testBody = document.createElement('h4');
                    testBody.innerHTML = post.body;
                new Modal(testBody);
            }
        });
    }

}
