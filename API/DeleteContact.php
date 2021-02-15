<?php
	
    $inData = getRequestInfo();
	$contactId = $inData["id"];
	$userId = $inData["userId"];

	$servername = "localhost";
	$username = "Aryan";
	$password = "testing321";
	$dbname = "COP4331";

    $conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
	else
	{
		// have to fix this function right now
		if (!validateUser($contactId, $userId))
		{
			returnWithError("User not authorized to delete contact");
		}
		else
		{
			$sql = "DELETE FROM COP4331.Contacts WHERE id=$contactId";
			if( $result = $conn->query($sql) != TRUE )
			{
				returnWithError( "Couldn't successfully delete contact" );
			}
			else
			{
				returnWithSuccess("Contact successfully deleted!");
			}
			$conn->close();
		}
	}

	function validateUser($contactId, $userId)
    {
		$conn = new mysqli("localhost", "Aryan", "testing321", "COP4331");
		if ($conn->connect_error) 
		{
			returnWithError( "Couldn't connect to database to validate user" );
		}
		else
		{
			// create an sql query that retrieves the foreign key of this contact
			$sql = "SELECT UserID FROM COP4331.Contacts where ID=". $contactId;
			$result = $conn->query($sql);
			if ($result === FALSE)
			{
				$conn->close();
				return FALSE;
			}
			else
			{
				if ($result->num_rows > 0)
				{
					$row = $result->fetch_assoc();
					$foreignKey = $row["UserID"];
					// check if the foreignKey stored for this contact matches the current user's id
					if ($foreignKey == $userId)
					{
						$conn->close();
						return TRUE;
					}
				}
			}
		}
		$conn->close();
        return FALSE;
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