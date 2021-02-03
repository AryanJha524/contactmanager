<?php

	// db information
	$servername = "localhost";
	$username = "root";
	$password = "cop4331g5mysql";
	$dbname1 = "Users";
	$dbname2 = "Contacts";

	$inData = getRequestInfo();
    
    // storing information about the contact received from front end to use later when inserting into the database
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phoneNumber = $inData["phoneNumber"];

    // store current user's ID to use as a foreign key for the new contact that we are creating
	$userId = $inData["userId"];
	if ($userId == '')
	{
		returnWithError("User must be logged in");
	}

	// check if this id exists in our user database to ensure this contact is linked with an existing user
	$userconn = new mysqli($servername, $username, $password, $dbname1);
	
	if ($userconn->connect_error)
	{
		returnWithError($userconn->connect_error);
	}
	else
	{
		// creating SQL query to find a user with this ID
		$sql = "SELECT userId FROM Users WHERE userId = ?";
		$stmt = $userconn->prepare($sql);
		$stmt->bind_param("i", $userId);
		$stmt->execute();

		$result = $stmt->get_result();
		if ($result->num_rows <= 0)
		{
			returnWithError("Cannot find a user with this ID");
		}
	}


	$conn = new mysqli($servername, $username, $password, $dbname2);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$dateCreated = date('Y-m-d H:i:s');

		// the userID will be inserted as a foreign key for this contact
		$sql = "INSERT INTO Contacts (firstName, lastName, email, phoneNumber, dateCreated, userId) VALUES ($firstName, $lastName, $email, $phoneNumber, $dateCreated, $userId)";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithSuccess("Contact successfully added!");
	
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