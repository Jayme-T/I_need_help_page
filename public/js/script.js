'use strict';


//main app code here
document.querySelector('#press').addEventListener('click', userClicksAButton);

function userClicksAButton() {
  console.log('test');

	var inputtedData = {
		title: document.querySelector('#title'),
		body: document.querySelector('textarea')
	};
console.log(inputtedData);
	// Post.createNew(inputtedData);
}
