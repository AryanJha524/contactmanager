<?php
    $inData = getRequestInfo();
	$contactId = $inData["id"];
	$userId = $inData["userId"];

    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		if (validateUser($contactId, $userId) != true)
		{
			returnWithError("User not authorized to delete contact");
		}
		else
		{
			$sql = "DELETE FROM Contacts WHERE id=?";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param("i", $contactId);
			$stmt->execute();

			$result = $stmt->get_result();
			if( $result = $conn->query($sql) != TRUE )
			{
				returnWithError( $conn->error );
			}
			$conn->close();
			returnWithSuccess("Contact successfully deleted!");
		}
	}

	// TODO: add function to validate this user created this contact
	// can do by finding the foreign id of this contact and matching with given user id
	function validateUser($contactId, $userId)
    {
		$conn = new mysqli($servername, $username, $password, $dbname);
		if ($conn->connect_error) 
		{
			returnWithError( $conn->connect_error );
		} 
        return false;
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