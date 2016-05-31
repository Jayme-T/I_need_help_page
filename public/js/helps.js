'use strict';

var Help = function(uid) {
    this.uid = uid;
}

Help.prototype.fetchAll = function () {
    //fetch all 'helps' of all users
    return null;
};
Help.prototype.fetchAllFromUser = function () {
    //fetch all 'helps' of current user
    return null;
};

Help.prototype.createNew = function (title, body) {
    console.log("here? ", title, body);
    console.log("user: ", this.uid)
    // A post entry.
    var postData = {
        uid: this.uid,
        body: body,
        title: title,
        starCount: 0
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
    console.log("newPostKey: ", newPostKey)
    // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    //     updates['/posts/' + newPostKey] = postData;
    //     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref('/posts/').set(postData);
    // return firebase.database().ref('/user-posts/'+newPostKey+"/").set(postData);
};
