


//user settings
var userIcon = document.getElementById('user-icon');
    userIcon.addEventListener('click', openUserSettings);

function openUserSettings(e) {
    var currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        console.log("NO USER!")
        showNoUserSettings(e);
        return;
    }
    // console.log("currentUser: ", currentUser);
    var settings = document.createElement('div');
        settings.className = "user-settings-inner";
    var settingsTitle = document.createElement('h3');
        settingsTitle.className = "section-title";
        settingsTitle.innerHTML = "Settings";
    var nameLabel = document.createElement('h4');
        nameLabel.className = "input-label";
        nameLabel.innerHTML = "Display name:";
    var name = document.createElement('input');
        name.type = 'text';
        console.log("currentUser: ", currentUser.displayName)
        if (!currentUser.displayName) {
            name.placeholder = "What's yo name?";
        } else {
            name.value = currentUser.displayName;
        }

    var saveBtn = document.createElement('div');
        saveBtn.className = 'btn';
        saveBtn.innerHTML = "Save";
        saveBtn.addEventListener('click', function() {
            loadingSaveButton();
            if (name.value == "" || !name.value) {
                new Notification('error', 'Name cannot be blank', 2000);
                return;
            }
            currentUser.updateProfile({
                displayName: name.value
            }).then(function() {
                // Update successful.
                resetSaveButton();
                new Notification('success', 'Save successful. Thanks, ' + name.value, 2000);
            }, function(error) {
                //unsuccessful
                resetSaveButton();
                console.error("error: ", error);
                new Notification('error', 'Save unsuccessful. '+ error, 3000);
            });

            function loadingSaveButton(){
                saveBtn.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
                saveBtn.style.fontSize = "8px";
            }
            function resetSaveButton() {
                saveBtn.innerHTML = "Save";
                saveBtn.style.fontSize = "inherit";
            }
        });

    var navigationTitle = document.createElement('h3');
        navigationTitle.className = "section-title";
        navigationTitle.innerHTML = "Navigation";

    var goHome = document.createElement('div');
        goHome.className = "user-goHome btn";
        goHome.innerHTML = "Dashboard";
        goHome.addEventListener('click', function() {
            routeTo('/index.html');
        });


    var logout = document.createElement('div');
        logout.className = "user-logout btn";
        logout.innerHTML = "Sign out";
        logout.addEventListener('click', logoutUser);

    var lineBreak = document.createElement('hr');
    var lineBreakTwo = lineBreak.cloneNode();

    settings.appendChild(settingsTitle);
    settings.appendChild(nameLabel);
    settings.appendChild(name);
    settings.appendChild(saveBtn);

    settings.appendChild(lineBreak);

    settings.appendChild(navigationTitle);
    settings.appendChild(goHome);
    // settings.appendChild(lineBreakTwo);
    settings.appendChild(logout);


    new Modal(settings);
}

function logoutUser() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        new Notification('success', 'You have successfully logged out', 3000);
        setTimeout(function() {
            window.location.assign("/auth/login.html?u=lo");
        }, 3100);
    }, function(error) {
        new Notification('error', 'There was an error logging out. Please try again.', 3000);
    });
}

function showNoUserSettings(e) {
    var settings = document.createElement('div');
        settings.className = "user-settings-inner";
    var title = document.createElement('h3');
        title.innerHTML = "Menu";
        title.style.textAlign = "center";
    var login = document.createElement('div');
        login.className = "user-login btn";
        login.innerHTML = "Sign In";
        login.addEventListener('click', function() {
            routeTo('/auth/login.html');
        });
    var register = document.createElement('div');
        register.className = "user-register btn";
        register.innerHTML = "Register";
        register.addEventListener('click', function() {
            routeTo('/auth/register.html');
        });
    var lineBreak = document.createElement('hr');

    settings.appendChild(title);
    settings.appendChild(login);
    settings.appendChild(lineBreak);
    settings.appendChild(register);
    new Modal(settings);
}


function routeTo(path) {
    window.location.assign(path);
}
