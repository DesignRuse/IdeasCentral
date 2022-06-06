
window.addEventListener('DOMContentLoaded', function () {

	var menuIcon = document.getElementsByClassName('menu-icon')[0];
	var navigation = document.getElementsByClassName('navigation')[0];
	var menu = document.getElementsByClassName('menu')[0];
	if (typeof navigation != "undefined") {
		navigation.style.height = '0';
		menuIcon.addEventListener('click', function() {
			if(navigation.getBoundingClientRect().height == '0') {
				navigation.style.height = 'auto';
				navigation.style.padding = '1.5rem 0';		/* padding: 1.5rem 0; */
				menuIcon.firstElementChild.className = 'fa fa-times-circle';
			} 
			else {
				navigation.style.height = '0';
				navigation.style.padding = '0';	
				menuIcon.firstElementChild.className = 'fa fa-bars';
			}
		});
	}

	if (typeof menu != "undefined") {
		menu.style.height = '0';
		menuIcon.addEventListener('click', function() {
			if(menu.getBoundingClientRect().height == '0') {
				menu.style.height = 'auto';
				menu.style.padding = '1.5rem 0';		/* padding: 1.5rem 0; */
				menuIcon.firstElementChild.className = 'fa fa-times-circle';
			} 
			else {
				menu.style.height = '0';
				menu.style.padding = '0';	
				menuIcon.firstElementChild.className = 'fa fa-bars';
			}
		});
	}

	
	function success(form) {
		form.reset();
		var parentOfFormContainer = form.parentElement.parentElement;
		parentOfFormContainer.getElementsByClassName('memo')[0].classList.add('success');
		parentOfFormContainer.getElementsByClassName('memo-text')[0].innerHTML = 'Thanks!<br /> Your message has been sent.';
		parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.opacity = '1';
		parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.display = 'block';
		setTimeout(function () {
			parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.opacity = '0';
			parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.display = 'none';
			parentOfFormContainer.getElementsByClassName('memo')[0].classList.remove('success');
			parentOfFormContainer.getElementsByClassName('memo-text')[0].innerHTML = '';
		}, 4000);
	}

	function error(form) {
		var parentOfFormContainer = form.parentElement.parentElement;
		parentOfFormContainer.getElementsByClassName('memo')[0].classList.add('error');
		parentOfFormContainer.getElementsByClassName('memo-text')[0].innerHTML = 'Oops!<br /> There was a problem.';
		parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.opacity = '1';
		parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.display = 'block';
		setTimeout(function () {
			parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.opacity = '0';
			parentOfFormContainer.getElementsByClassName('memo-modal')[0].style.display = 'none';
			parentOfFormContainer.getElementsByClassName('memo')[0].classList.remove('error');
			parentOfFormContainer.getElementsByClassName('memo-text')[0].innerHTML = '';
		}, 4000);
	}

	// Handles the button click event and the subsequent form submission event
	for (let i = 0; i < document.forms.length; i++) {
		document.forms[i].getElementsByTagName('button')[0].addEventListener('click', function (ev) {
			ev.preventDefault();
			var data = new FormData(document.forms[i]);
			// Submits form data to a Google Spreadsheet
			if (document.forms[i] == document.forms[1]) {
				var scriptURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdNo8tURNDtQ-rbsIdvxIOKXGeZFtQmSXFQ0NNJ8W8QyXGa3w/formResponse?';
				fetch(scriptURL, {
						method: 'POST',
						mode: 'no-cors',
						cache: 'no-cache',
						credentials: 'omit',
						headers: {
							'Content-Type': 'application/json'
						},
						redirect: 'follow',
						body: data
					})
					.then(response => console.log('Success!', response))
					.catch(error => console.error('Error!', error.message));
			}
			ajax(document.forms[i].method, document.forms[i].action, data, document.forms[i], success, error);
		});

		//----- The code below is just another way of doing the same thing as the code above 

		/*document.forms[i].getElementsByTagName('button')[0].onclick = () => {
			document.forms[i].addEventListener('submit', function (ev) {
				ev.preventDefault();
				var data = new FormData(document.forms[i]);
				ajax(document.forms[i].method, document.forms[i].action, data, document.forms[i], success, error);
			});
		}*/
	}
	
});

// helper function for sending an AJAX request
function ajax(method, url, data, form, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(form);
		} else {
			error(form);
		}
	};
	xhr.send(data);
}

