# I Need Help

This is a page we are creating to help compile questions that are asked
throughout the g27 cohort. Our goal is to make a user friendly site
that allows for anonymity in asking questions
that pertain to work in class. It also offers
a way to connect students with the class with the direct
goals of getting answers to coding not just sharing info like
slack.

We are just now getting started creating
the site. Please feel free to ask questions or make suggestions


----
##Want to help develop this?
1. Fork and clone the repo
1. cd into the folder
1. run `npm install` to download dependencies
1. Important steps are below!

####How to use Gulp and Sass in this project
***This project uses sass and gulp. Gulp is a javascript task runner that allows us to auto-compile our scss/sass stylesheets down to one single style.css file.***
*You can read more about gulp here - http://gulpjs.com/*


1. run `npm install -g gulp-cli`
    * This allows you to run gulp tasks from your command line
1. Look in the public directory in the project. You will see a css folder, with a file called style.css. Delete that file. Yep, just delete it, it's ok
1. Now from your command line in the main project folder, run `gulp watch`
1. See how that css file magically appeared and that gulp is now running a process in your command line?
1. **All style changes will be done in the 'styles' folder. Go make a slight style change in one of the .scss files and save it. If you look in your command line where gulp is running, you will see some new lines that say something like this "[09:54:39] Starting 'css-dev'...
[09:54:39] Finished 'css-dev' after 105 ms";
1. This is gulp watching your scss files for changes, when a change is made, it re-compiles the sass code into one file and puts that file in the public/css folder. Cool huh?
