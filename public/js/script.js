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

                if (item.isFinished === true) {return; }
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
                    var itemBody = document.createElement('p');
                        itemBody.className = 'item-text';
                        itemBody.innerHTML = item.body;
                    var itemPID = document.createElement('p');
                        itemPID.className = 'item-text';
                        itemPID.innerHTML = item.pid;



                listitem.appendChild(rmv);
                listitem.appendChild(itemTitle);
                listitem.appendChild(itemBody);
                listitem.appendChild(itemPID);
                postList.appendChild(listitem);

                function removeFromList(e) {
                  // console.log(e.target.parentElement.data.uid);
                  // console.log(user.uid);
                //   console.log(itemUID.innerHTML);
                //   console.log(user);
                  if(e.target.parentElement.data.uid !== user.uid){
                    console.log("can't remove a post you didn't write");
                  }
                  else {

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
                    console.log(data.uid);
                    console.log("POST WAS edited!: ", data);
                });

    	}
