var urlBase = 'http://s21cop4331group5.tech/API';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
	userId = 0;

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	// var hash = md5( password );

	document.getElementById("loginResult").innerHTML = " ";

	// var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		console.log(xhr.responseText);
		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		window.location.href = "http://s21cop4331group5.tech/main.html";

	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister()
{
	userId = 0;
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	// var hash = md5( password );

	document.getElementById("registration").innerHTML = " ";

	// var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '", "firstName" : "' + firstName + '", "lastName" : "' + lastName + '"}';
	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName +'", "login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Register.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		console.log("Result is: " + checkExistance(jsonPayload));
		if(checkExistance(jsonPayload))
		{
			document.getElementById("registration").innerHTML = "Account already created";
			return;
		}
		xhr.send(jsonPayload);
		console.log(jsonPayload);
		console.log(xhr.responseText);
				var jsonObject = JSON.parse( xhr.responseText );

				userId = jsonObject.id;


				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
				document.getElementById("registration").innerHTML = "\nAccount created.";
				window.location.href = "http://s21cop4331group5.tech/";

	}
	catch(err)
	{
		document.getElementById("registration").innerHTML = err.message;
	}

}

function checkExistance(json)
{
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(json);
		console.log(xhr.responseText);
		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId > 0 )
		{
			return true;
		}
		else
			return false;
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function openRegister()
{
	window.location.href = "http://s21cop4331group5.tech/register.html";
}

function openCreateContacts()
{
	window.location.href = "http://s21cop4331group5.tech/addContact.html";
}

function createContact()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phone = document.getElementById("phoneNumber").value;
	var email = document.getElementById("email").value;
	getUserID();
	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName +
	'", "email" : "' + email + '", "phoneNumber" : "' + phone + '", "userID" : ' + userId + '}';
	var url = urlBase + '/CreateContact.' + extension;
	console.log(jsonPayload);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{

		document.getElementById("registration").innerHTML = "Contact has been added!";
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registration").innerHTML = err.message;
	}

}

function updateContact()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phone = document.getElementById("phoneNumber").value;
	var email = document.getElementById("email").value;
	document.getElementById("contactAddResult").innerHTML = " ";

	var jsonPayload = '{"newFirstName" : "' + firstName + '", "newLastName" : '
	+ lastName +'", "newEmail" : "' + email + '", "newPhoneNumber" : "' + phone +'", "id" : ' + id +', "userID" : ' + userId + '}';
	var url = urlBase + '/UpdateContact.' + extension;
	console.log(jsonPayload);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been updated!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}

}



// Something to get that contact
// Put a button next to contact
function deleteContact()
{
	var id = 0;
	document.getElementById("contactAddResult").innerHTML = " ";

	var jsonPayload = '{"id" : ' + id + ', "userID" : ' + userId + '}';
	var url = urlBase + '/DeleteContact.' + extension;
	console.log(jsonPayload);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been Deleted!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}

}


function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function getUserID()
{
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
}

function getFirstName()
{
	var data = document.cookie;
	var splits = data.split(",");
	var firstName = "";
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = parseInt( tokens[1].trim() );
		}
	}
	return firstName;
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}



function searchContact()
{
	var srch = document.getElementById("firstName").value;
	// document.getElementById("searchResult").innerHTML = "Contacts will show here!";

	var contactList = "";
	getUserID();
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		console.log(xhr.responseText);
		var jsonObject = JSON.parse( xhr.responseText );
		console.log("A");
		for( var i=0; i<jsonObject.results.length; i++ )
		{
			contactList += jsonObject.results[i];
			if( i < jsonObject.results.length - 1 )
			{
				contactList += "<br />\r\n";
			}
		}

		document.getElementsByTagName("p")[0].innerHTML = contactList;


		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err.message);
	}

}
