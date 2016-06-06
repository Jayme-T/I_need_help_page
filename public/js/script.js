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




    var button = document.getElementById('press');
    button.addEventListener('click', function() {
        var title = document.getElementById("title");
        var body = document.querySelector('textarea');
        firebaseDatabase.createNewPost(title.value, body.value);
    });
    var postList = document.getElementById('posts-list');
    console.log(postList);

    function appendToList(item) {

        //main app code here

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
        var itemBody = document.createElement('p');
        itemBody.className = 'item-text';
        itemBody.innerHTML = item.body;
        var itemPID = document.createElement('p');
        itemPID.className = 'item-text';
        itemPID.innerHTML = item.pid;

        var editButton = document.createElement('button');
        editButton.innerHTML = "Edit";
        editButton.style.marginLeft = "40px";
        editButton.addEventListener('click', edit);
        var CommentButton = document.createElement('button');
        CommentButton.innerHTML = "Comment";
        CommentButton.style.marginLeft = "40px";
        CommentButton.addEventListener('click', querystring);
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

    function edit(e) {
        if (e.target.parentElement.data.uid !== user.uid) {
            new Notification('error', "can't edit a question you didn't write", 3000)

        } else {
            document.querySelector('textarea').value = e.target.parentElement.data.body;
            document.querySelector('#title').value = e.target.parentElement.data.title;
            window.scrollTo(0, 0);
            firebaseDatabase.deletePost(e.target.parentElement.data.pid);
            // firebaseDatabase.setPostIsFinished(e.target.parentElement.data.pid);
            e.target.parentElement.remove();

        }

    }
       function querystring(e){
         //console.log("button working");
    //      var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + start.value + '&destination=' + destination.value;
    // var finalurl = jsonp + encodeURIComponent(url);
    var url= "http://localhost:8080/question.html";

     var pid= e.target.parentElement.data.pid;
     var finalurl= url+ "?" + pid;
     console.log(finalurl);
     var myWindow = window.open(finalurl, "_self");
    //window.open(finalurl);

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



    document.querySelector('#newest').addEventListener('click', newer);
    document.querySelector('#oldest').addEventListener('click', oldest);
    document.querySelector('#uid').addEventListener('click', onlyusers);

    function newer(e) {
      document.querySelector('#posts-list').children;
      console.log("newer")
        // var arr = [];
        //sort the dates of each post from oldest to newest
        // for (var i = 0; i < postList.children.length; i++) {
        //   console.log(document.querySelector('#posts-list').append(document.querySelector('posts.list').find('listitem').get().reverse()));
        //     $('ul').append($('ul').find('li').get().reverse());
        //     arr.push(postList.children[i].data.date_created);
        //     console.log(arr.sort());
        // }
        // for (var j = arr.length; j >= 0; j--) {
        //     //need to say if the firebase data at date_creates===arr[j]
        //     //make a new list item. Will also need to remove all existing listitems
        //     if (postList.children[i].data.date_created === arr[j]) {
        //         console.log("is this function working");
        //         appendToList();
        //     }
        }




function oldest() {

      for(var i=0; i<postList.children.length; i++){
        postList.children[i].style.display="block";
    }

}

function onlyusers() {
    console.log("uid");
    for(var i=0; i<postList.children.length; i++){
    //console.log(postList.children[i].data.uid);
    if (postList.children[i].data.uid !== user.uid){
      postList.children[i].style.display="none";
    }
}
}
}
