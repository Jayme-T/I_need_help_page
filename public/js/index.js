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


    // var button = document.getElementById('press');
    // button.addEventListener('click', function() {
    //     var title = document.getElementById("title");
    //     var body = document.querySelector('textarea');
    //     firebaseDatabase.createNewPost(title.value, body.value);
    //
    //     document.getElementById("title").value="";
    //     document.querySelector('textarea').value="";
    //     window.scrollTo(1500, 1530);
    // });
    var postList = document.getElementById('posts-list');
    // //console.log("postList.children: ", postList.children.length);
    // console.log(postList);

    function appendToList(item) {

        //remove loader from list
        removeLoadingSpinner(postList);

        //main app code here

        if (item.isFinished === true) {
            return;
        }
        var listitem = document.createElement('li');
        listitem.className = "list-item";
        listitem.data = item; //necessary! to hold data

        var itemTextBox = document.createElement('div');
            itemTextBox.className = "item-text-box";
            var itemTitle = document.createElement('h3');
            itemTitle.className = 'item-text';
            itemTitle.innerHTML = item.title;
        itemTextBox.appendChild(itemTitle);

        // var itemBodyBox = document.createElement('div');
        //     itemBodyBox.className = "item-body-box";
        //     var itemBody = document.createElement('p');
        //     itemBody.className = 'item-text';
        //     itemBody.innerHTML = item.body;
        // itemBodyBox.appendChild(itemBody);

        // var itemPID = document.createElement('p');
        // itemPID.className = 'item-text';
        // itemPID.innerHTML = item.pid;

        var menuButtonBox = document.createElement('div');
            menuButtonBox.className = "menu-box";
            menuButtonBox.data = item; //for use in the modal menu
            var menuIcon = document.createElement('i');
                menuIcon.className = "fa fa-ellipsis-h menu-box-icon";
            menuButtonBox.addEventListener('click', function() {

                //create menu for each post on click
                var postMenu = document.createElement('div');
                    postMenu.className = "post-menu";
                    postMenu.id = "current-post-menu";
                    postMenu.data = this.data;

                //comment
                var commentButton = document.createElement('div');
                    commentButton.className = "comment btn";
                    commentButton.innerHTML = "Comment";
                    commentButton.addEventListener('click', querystring);

                //edit
                var editButton = document.createElement('div');
                    editButton.className = "edit btn";
                    editButton.innerHTML = "Edit";
                    editButton.addEventListener('click', edit);


                //delete
                var rmvButton = document.createElement('div');
                    rmvButton.className = "remove btn";
                    rmvButton.innerHTML = "Delete";
                    rmvButton.addEventListener('click', removeFromList);
                    if (user.uid === this.data.uid) { //close modal window too
                        rmvButton.addEventListener('click', function(){
                            document.querySelector(".modal").remove();
                        });
                    } //otherwise don't close modal

                //add all elements to post menu
                postMenu.appendChild(commentButton);
                postMenu.appendChild(editButton);
                postMenu.appendChild(rmvButton);


                new Modal(postMenu);
            });

        menuButtonBox.appendChild(menuIcon);

        listitem.appendChild(itemTextBox);
        listitem.appendChild(menuButtonBox);


        //I will add an event listenter and if you click on a topic
        //you can see the whole questions and provide answers.
        //That way long questions don't take the entire page.


        postList.appendChild(listitem);

        function removeFromList(e) {
            // console.log(e.target.parentElement.data.uid);
            // console.log(user.uid);
            //   console.log(itemUID.innerHTML);
            //   console.log(user);

            if (e.target.parentElement.data.uid !== user.uid) {
                new Notification('error', "can't remove a question you didn't write", 3000);
            } else {
                new Notification('success', 'question removed', 3000);

                firebaseDatabase.deletePost(e.target.parentElement.data.pid);
                // firebaseDatabase.setPostIsFinished(e.target.parentElement.data.pid);

                // e.target.parentElement.remove();
                //***** Since the modal is opened, target.parentElement no longer worked,
                //****** So I added code to onPostRemoved to remove the element from the post list
            }

        }


    }


    firebaseDatabase.onPostAdded(appendToList);


    firebaseDatabase.onPostRemoved(function(data) {
        console.log("POST WAS REMOVED!: ", data);
        //delete removed post from post list
        for (var p = 0; p < postList.children.length; p++){
            if (postList.children[p].data.pid === data.pid) {
                postList.children[p].remove();
            }
        }
    });

    firebaseDatabase.onPostUpdated(function(data) {
        console.log("POST WAS EDITED!: ", data);
    });

    function edit(e) {
        if (e.target.parentElement.data.uid !== user.uid) {
            new Notification('error', "can't edit a question you didn't write", 3000);

        } else {
            document.querySelector('textarea').value = e.target.parentElement.data.body;
            document.querySelector('#title').value = e.target.parentElement.data.title;
            window.scrollTo(0, 0);
            firebaseDatabase.deletePost(e.target.parentElement.data.pid);
            // firebaseDatabase.setPostIsFinished(e.target.parentElement.data.pid);
            // e.target.parentElement.remove();
            //**** post deletion now handled by onPostRemoved event
        }

    }

    function querystring(e){
        var url= "/question.html";
        var pid= e.target.parentElement.data.pid;
        var finalurl= url+ "?" + pid;
        // console.log(finalurl);

        //open window to /question.html?pid
        window.location.assign(finalurl);

    }

    // function test(e){
    //   console.log(e.target.parentElement.data.body);
    //   var para=document.createElement('p');
    //   para.appendChild(e.target.parentElement.data.body);
    //   //e.target.parentElement.data.body
    // //e.target.data.('p.item-text').style.display="block";
    //   // listitem.appendChild(itemBody);
    // }


    // //if url query has pid=slug, open modal with that info
    // console.log("location: ", window.location);
    // var querySlug = window.location.search;
    // var currentPagePID = querySlug.substring(querySlug.indexOf("=") + 1, querySlug.length);
    // console.log("currentPagePID: ", currentPagePID);
    // if (currentPagePID !== "") {
    //     firebaseDatabase.fetchSinglePost(currentPagePID, function(post) {
    //         console.log("post: ", post);
    //         if (post) { //if post data is not null,
    //             //open modal
    //             var testTitle = document.createElement('h4');
    //             testTitle.innerHTML = post.title;
    //             var testBody = document.createElement('h4');
    //             testBody.innerHTML = post.body;
    //             new Modal(testBody);
    //         }
    //     });
    // }



    document.querySelector('#newest').addEventListener('click', newer);
    document.querySelector('#oldest').addEventListener('click', oldest);
    document.querySelector('#uid').addEventListener('click', onlyusers);

    function newer(e) {
    //   document.querySelector('#posts-list').children;
      console.log("newer");
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
            postList.children[i].style.display="flex";
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


    function removeLoadingSpinner(elem) {
        // loading fa fa-spinner fa-pulse fa-3x fa-fw
        elem.classList.remove('loading');
        elem.classList.remove('fa');
        elem.classList.remove('fa-spinner');
        elem.classList.remove('fa-pulse');
        elem.classList.remove('fa-3x');
        elem.classList.remove('fa-fw');
    }


    document.getElementById('seeQuestions').addEventListener('click', function(){
      console.log("testing click");
      document.getElementById('allQuestionInfo').style.display="block";
    });
}
