'use strict';
var firebase = firebase;

//initialize
var FirebaseDatabase = function(uid) {
    this.uid = uid;
};

FirebaseDatabase.prototype.fetchSinglePost = function (pid, callback) {
    firebase.database().ref('posts/'+pid).once('value', function(snapshot) {
        return callback(snapshot.val());
    });
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
        // console.log("snapshot: ", snapshot.val());
        return callback(snapshot.val());
    });
};

/**FIXME!!! MOVE ME ELSEWHERE*/
FirebaseDatabase.prototype.onCommentAdded = function (pid, callback) {
    firebase.database().ref('comments/'+pid).on('child_added', function(snapshot) {
        // console.log("snapshot: ", snapshot.val());
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
FirebaseDatabase.prototype.createNewPost = function (title, body, callback) {
    // Create a key for a new post
    var uniquePostId = "P_"+firebase.database().ref().child('posts').push().key;
    // console.log("uniquePostId: ", uniquePostId);

    // Data to send
    var postData = {
        uid: this.uid, //user id
        pid: uniquePostId, //post id
        title: title, //title of post from first parameter
        body: body, //body of post from second parameter
        isAnonymous: true, //default anonymous to true
        isFinished: false, //default isFinished to false
        date_created: Date()
    };


    //save to "posts" table
    var toPosts = firebase.database().ref('/posts/'+uniquePostId).set(postData);
    console.log("posts.then: ", toPosts.then(function() {
        var toUser = firebase.database().ref('/user-posts/'+this.uid+'/'+uniquePostId).set(postData);
        toUser.then(function() {
            // console.log("done with both");
            if (typeof callback !== 'undefined') {
                return callback();
            }
        });
    }.bind(this)));
    //save to "user-posts" table


    // return callback();
};

FirebaseDatabase.prototype.setPostIsFinished = function (pid) {
    if (!pid) {
        throw new Error('Post ID (first argument) is not defined');
    }
    var fin = {
        isFinished: true
    };
    //update the post at the pid in the 'posts' table
    firebase.database().ref('/posts/' + pid).update(fin);
    //update the post at the pid in the 'user-posts' table
    firebase.database().ref('/user-posts/' + this.uid + '/' + pid).update(fin);
};

FirebaseDatabase.prototype.deletePost = function (pid) {
    if (!pid) {
        throw new Error('Post ID (first argument) is not defined');
    }

    /**FIXME: establish checks for correct pid*/
    /**FIXME: add database validation rules for who can delete a post*/

    //remove the post with this pid in the 'posts' table
    firebase.database().ref('/posts/' + pid).set(null);
    //remove the post with this pid in the 'user-posts' table
    firebase.database().ref('/user-posts/' + this.uid + '/' + pid).set(null);
};


//comments
FirebaseDatabase.prototype.createNewComment = function (pid, body) {
    // console.log("pid: ", pid);
    // console.log("body: ", body);
    var uniqueCommentId = "C_"+firebase.database().ref().child('posts/'+pid).push().key;
    // Data to send
    var commentData = {
        uid: this.uid, //user id
        pid: pid, //post id from first parameter
        cid: uniqueCommentId,
        body: body //body of post from second parameter
        // date_created: Date()
    };

    firebase.database().ref('/comments/'+pid + '/' + uniqueCommentId).set(commentData);
};


FirebaseDatabase.prototype.fetchAllComments = function (pid, callback) {
    firebase.database().ref('comments/'+pid).once('value', function(snapshot) {
        return callback(snapshot.val());
    });
};

FirebaseDatabase.prototype.deleteComment = function (pid, cid) {

    /**FIXME: establish checks for correct pid*/
    /**FIXME: add database validation rules for who can delete a comment*/

    //remove the post with this pid in the 'posts' table
    firebase.database().ref('/comments/' + pid + '/' + cid).set(null);
};
