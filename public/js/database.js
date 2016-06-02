'use strict';

//initialize
var FirebaseDatabase = function(uid) {
    this.uid = uid;
};

FirebaseDatabase.prototype.fetchAllPosts = function () {
    //not needed right now, can use event listener onPostAdded on page load to get all posts
    var posts = null;
    return posts;
};

FirebaseDatabase.prototype.fetchAllPostsFromUser = function () {
    /**FIXME: Fetch all from user-posts*/
};


/** onPostAdded
*
* Event Listener for Firebase
* Triggered when a new post is added to the "posts" table
*   Use:
        - When a new child is added to the 'posts' table, this event is called.
            You can specify what you want to do with that new data after it is added
            to the database. For instance, create a new list item with the data
* @param {function} callback function
* @return {function} snapshot.val() is data from database from the new post
*/
FirebaseDatabase.prototype.onPostAdded = function (callback) {
    firebase.database().ref('posts/').on('child_added', function(snapshot) {
        console.log("snapshot: ", snapshot.val());
        return callback(snapshot.val());
    });
};



/** onPostRemoved
*
* Event Listener for Firebase
* Triggered when a post is removed from the "posts" table
*   Use:
        - When a new child is removed from the 'posts' table, this event is called.
            You can specify what you want to do with that deleted post data after it is removed
            from the database.
* @param {function} callback function
* @return {function} snapshot.val() is data from database from the removed post
*/
FirebaseDatabase.prototype.onPostRemoved = function (callback) {
    firebase.database().ref('posts/').on('child_removed', function(snapshot) {
        return callback(snapshot.val());

    });
};


/** onPostUpdated
*
* Event Listener for Firebase
* Triggered when a post is updated
*   Use:
        - When a new child is updated in the 'posts' table, this event is called.
            You can specify what you want to do with that updated post data
* @param {function} callback function
* @return {function} snapshot.val() is the new data from the updated post
*/
FirebaseDatabase.prototype.onPostUpdated = function (callback) {
    firebase.database().ref('posts/').on('child_changed', function(snapshot) {
        return callback(snapshot.val());
    });
};



/** createNewPost
*
* Create a new post and save it to the database
    - Saves in the "posts" table and the "user-posts" table
* @param {string} title: Title of the post
* @param {string} body: Body of the post
*/
FirebaseDatabase.prototype.createNewPost = function (title, body) {
    // Create a key for a new post
    var uniquePostId = firebase.database().ref().child('posts').push().key;
    // console.log("uniquePostId: ", uniquePostId);

    // Data to send
    var postData = {
        uid: this.uid, //user id
        pid: uniquePostId, //post id
        title: title, //title of post from first parameter
        body: body, //body of post from second parameter
        isAnonymous: true, //default anonymous to true
        isFinished: false //default isFinished to false
    };

    //save to "posts" table
    firebase.database().ref('/posts/'+uniquePostId).set(postData);
    //save to "user-posts" table
    firebase.database().ref('/user-posts/'+this.uid+'/'+uniquePostId).set(postData);
};

FirebaseDatabase.prototype.setPostIsFinished = function (pid) {
    if (!pid) {
        throw new Error('Post ID (first argument) is not defined');
        return;
    }
    var fin = {
        isFinished: true
    }
    //update the post at the pid in the 'posts' table
    firebase.database().ref('/posts/' + pid).update(fin);
    //update the post at the pid in the 'user-posts' table
    firebase.database().ref('/user-posts/' + this.uid + '/' + pid).update(fin);
};

FirebaseDatabase.prototype.deletePost = function (pid) {
    if (!pid) {
        throw new Error('Post ID (first argument) is not defined');
        return;
    }

    /**FIXME: establish checks for correct pid*/
    /**FIXME: add database validation rules for who can delete a post*/

    //remove the post with this pid in the 'posts' table
    firebase.database().ref('/posts/' + pid).set(null);
    //remove the post with this pid in the 'user-posts' table
    firebase.database().ref('/user-posts/' + this.uid + '/' + pid).set(null);
};
