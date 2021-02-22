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

	if(login === "" || password === "")
	{
		document.getElementById("registration").innerHTML = "<br />" + "Invalid inputs!";
		return;
	}
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

		// debugging
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

function updateContact(id)
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phone = document.getElementById("phoneNumber").value;
	var email = document.getElementById("email").value;

	getUserID();
	var jsonPayload = '{"newFirstName" : "' + firstName + '", "newLastName" : "'
	+ lastName +'", "newEmail" : "' + email + '", "newPhoneNumber" : "' + phone +'", "id" : ' + id +', "userId" : ' + userId + '}';
	var url = urlBase + '/UpdateContact.' + extension;
	console.log(jsonPayload);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		console.log("Contact has been updated!");
		xhr.send(jsonPayload);
		console.log(xhr.responseText);
	}
	catch(err)
	{
		console.log(err.message);
	}

}



// Something to get that contact
// Put a button next to contact
function deleteContact(id)
{
	// document.getElementById("contactAddResult").innerHTML = " ";

    getUserID();
	var jsonPayload = '{"id" : ' + id + ', "userId" : ' + userId + '}';
	var url = urlBase + '/DeleteContact.' + extension;
	console.log(jsonPayload);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		console.log("Contact has been Deleted!");
		xhr.send(jsonPayload);
		location.reload();
	}
	catch(err)
	{
		console.log(err.message);
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
			firstName = tokens[1].trim();
		}
	}
	document.getElementById("inner-title").innerHTML = "Hello, " + firstName + "!";
	console.log(firstName + "<----");
	return firstName;
} 

function getNameFirst() 
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
			firstName = tokens[1].trim();
		}
	}
	document.getElementById("inner-title").innerHTML = firstName + "'s contact list";
	console.log(firstName + "<----");
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
		// make sure we get valid search results
		try
        {
        	xhr.send(jsonPayload);
        }
        catch
        {
        	console.log(xhr.responseText);
        	return;
        }
         
		// print out search results 
		var tableHeaders = ["First Name", "Last Name", "Phone Number", "Email Address"];
		var jsonObject = JSON.parse( xhr.responseText ); 

		//create headers for table 
		contactList += "<tr>"; 
		for(var i = 0; i<tableHeaders.length; i++)
		contactList +=  "<th>" + tableHeaders[i] + "</th>";
		contactList += "</tr>";
        
		//Create rows for table
		for( var i=0; i<jsonObject.results.length; i++ )
		{
			contactList += "<tr>";
			contactList += "<td>" + jsonObject.results[i].firstName + "</td>"  ;
			contactList += "<td>" + jsonObject.results[i].lastName + "</td>";
			contactList += "<td>" + jsonObject.results[i].phoneNumber + "</td>";
			contactList += "<td>" + jsonObject.results[i].email + "</td>";
			contactList += "</tr>";
		}

		//end of table 
		contactList +="</table>" 
		document.getElementsByTagName("table")[0].innerHTML = contactList; 
		xhr.send(jsonPayload); 
	}
	catch(err)
	{
		console.log(err.message);
	}

}

function listContacts()
{
	var srch = "";
	// document.getElementById("searchResult").innerHTML = "Contacts will show here!";

	var contactList =  "<table>";
	getUserID();
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		console.log(jsonPayload);

		var tableHeaders = ["First Name", "Last Name", "Phone Number", "Email Address", " ", " "];
        var jsonObject = JSON.parse( xhr.responseText );

		// create headers for table
		contactList += "<tr>";
		for(var i = 0; i<tableHeaders.length; i++)
			contactList +=  "<th>" + tableHeaders[i] + "</th>";
		contactList += "</tr>";

		// create rows for table
		for( var i=0; i<jsonObject.results.length; i++ )
		{
			var id = jsonObject.results[i].ID;
			contactList += "<tr>";
			contactList += "<td>" + jsonObject.results[i].firstName + "</td>"  ;
			contactList += "<td>" + jsonObject.results[i].lastName + "</td>";
			contactList += "<td>" + jsonObject.results[i].phoneNumber + "</td>";
			contactList += "<td>" + jsonObject.results[i].email + "</td>";
			var transfer = 'http://s21cop4331group5.tech/update.html?id=' + id;
			contactList += '<td><button type="button" id="searchContactButton" class="addContactButton" onclick="location.href=\'' + transfer + '\'">Edit</button></td>';
            contactList += '<td><button type="button" id="delete" onclick= "deleteContact(' + id + ');">Delete</button></td>';
			contactList += "</tr>";
		}

		// end table
		contactList += "</table>";
		document.getElementsByTagName("table")[0].innerHTML = contactList;


		xhr.send(jsonPayload);

	}


	catch(err)
	{
		console.log(err.message);
	}
}

function emailValidation(email) {
	if(!email.includes('@'))
		return false;

	return true;
}

function phoneNumberValidation(phoneNumber) {
	var regex = /[A-Za-z]/g;

	if(regex.test(phoneNumber))
		return false;

	return true;
}
