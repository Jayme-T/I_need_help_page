'use strict';


var Post = function(uid) {
    this.uid = uid;
}

Post.prototype.fetchAll = function () {
    //fetch all 'helps' of all users
    return null;
};
Post.prototype.fetchAllFromUser = function () {
    //fetch all 'helps' of current user
    return null;
};

Post.prototype.createNew = function (title, body) {
    console.log("here? ", title, body);
    console.log("user: ", this.uid)

    // Get a key for a new Post.
    var uniquePostId = firebase.database().ref().child('posts').push().key;
    console.log("uniquePostId: ", uniquePostId);
    // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    //     updates['/posts/' + uniquePostId] = postData;
    //     updates['/user-posts/' + uid + '/' + uniquePostId] = postData;

    // Data to send
    var postData = {
        uid: this.uid,
        body: body,
        title: title,
        starCount: 0,
        pid: uniquePostId
    };
    //save to database per user
    firebase.database().ref('/user-posts/'+this.uid+'/'+uniquePostId).set(postData);
    //save to database as post
    firebase.database().ref('/posts/'+uniquePostId).set(postData);
    // return firebase.database().ref('/user-posts/'+newPostKey+"/").set(postData);
};
