<?php

	// db information
	$servername = "localhost";
	$username = "Aryan";
	$password = "testing321";
	$dbname = "COP4331";

	$inData = getRequestInfo();
    // storing information about the contact received from front end to use later when inserting into the database
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phoneNumber = $inData["phoneNumber"];

    // store current user's ID to use as a foreign key for the new contact that we are creating
	$userId = $inData["userID"];
	if ($userId == '')
	{
		returnWithError("User must be logged in");
	}

	// check if this id exists in our user database to ensure this contact is linked with an existing user
    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	}
	else
	{
			// the userID will be inserted as a foreign key for this contact
			// FIX SQL QUERY
			$sql = "INSERT INTO COP4331.Contacts (UserID, firstName, lastName, email, phoneNumber) VALUES (" . $userId . ",'" . $firstName . "','" . $lastName . "','" . $email . "','" . $phoneNumber . "')";
			$result = $conn->query($sql);			
			if($result === TRUE)
			{
				returnWithSuccess("Contact successfully added!");
			}
			else
			{
				returnWithError( "Couldn't insert contact into database" );
			}
			$conn->close();
	}
		
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithSuccess($message)
	{
		$retValue = '{"success":"' . $message . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>