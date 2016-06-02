'use strict';

var Notification = function(type, message, time) {
   this.type = type; //must be error or success
   this.message = message;
   this.portal = false;
   this.removeAfter = 3000; //remove after 3 seconds

   if (time !== "max") {
       this.time = (!time) ? 3000 : time;
   } else {this.time = 600000; //10 minutes

   //run
   this.show();
 }
};

Notification.prototype.show = function () {
   if (!this.portal) {
      this.portal = document.createElement('div');
         this.portal.className = "notification fade " + this.type;
         var msg = document.createElement('h3');
            msg.className = "message";
            msg.innerHTML = this.message;
         this.portal.appendChild(msg);
      if (!this.hasList()) {
         //ensures that notification list is created first
         //if not, calls render as callback after appending list ul to body
         this.createList(this.render.bind(this)); //bind to attach this portal to render method
      } else {this.render();
      }
   }
};

Notification.prototype.render = function () {
   var notif = document.querySelector('.notification-list');
   notif.appendChild(this.portal);
   setTimeout(function() {
      this.portal.classList.remove('fade'); //for transition
   }.bind(this), 10);
   this.fadeOut();
};

Notification.prototype.fadeOut = function () {
   setTimeout(function() {
      this.hide();
   }.bind(this), this.time);
};

Notification.prototype.hide = function () {
   //add fade class back to element to fade back up
   this.portal.classList.add('fade');
   //remove after time specified
   setTimeout(function() {
      this.unmount();
  }.bind(this), this.removeAfter);
};

Notification.prototype.unmount = function () {
   this.portal.remove();  //remove notification
   //and if the notification-list has no children, remove it from body
   if (document.querySelector('.notification-list').children.length === 0) {
      document.querySelector('.notification-list').remove();
   }
};

Notification.prototype.hasList = function() {
   var notif = document.querySelector('.notification-list');
   return (!notif) ? false : true; //if notification-list is falsy, return false, else true
};

Notification.prototype.createList = function(callback) {
   var list = document.createElement('div');
      list.className = 'notification-list';

   document.body.insertBefore(list, document.body.children[0]);

   return callback();

};
