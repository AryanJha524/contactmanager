<?php
    $inData = getRequestInfo();
    $contactId = $inData["id"];
    $userId = $inData["userId"];

    $servername = "localhost";
	$username = "Aryan";
	$password = "testing321";
	$dbname = "COP4331";

    // connecting to the database
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) 
	{
		returnWithError($conn->connect_error);
	} 
    else
    {
        // have to fix this function
        if (/*validateUser($contactId, $userId)*/ false == true)
		{
			returnWithError("User not authorized to update contact");
        }
        else
        {
            // find the contact to update and extract its fields
            $sql = "SELECT ID,firstName,lastName, email, phoneNumber FROM COP4331.Contacts where ID=$contactId";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $oldFirstName = $row["firstName"];
                echo($oldFirstName);
                $oldLastName = $row["lastName"];
                echo($oldLastName);
                $oldEmail = $row["email"];
                echo($oldEmail);
                $oldPhoneNumber = $row["phoneNumber"];
                echo($oldPhoneNumber);

                // set updated values that we will insert to either the new value or the old one (if no new info was provided on the update form)
                $updatedFirstName = ($inData["newFirstName"]) ? $inData["newFirstName"] : $oldFirstName;
                $updatedLastName = ($inData["newLastName"]) ? $inData["newLastName"] : $oldLastName;
                $updatedEmail = ($inData["newEmail"]) ? $inData["newEmail"] : $oldEmail;
                $updatedPhoneNumber = ($inData["newPhoneNumber"]) ? $inData["newPhoneNumber"] : $oldPhoneNumber;

                // perform an SQL to update the desired contact
                $sql = "UPDATE COP4331.Contacts SET firstName='".$updatedFirstName."',lastName='".$updatedLastName."',email='".$updatedEmail."',phoneNumber='".$updatedPhoneNumber."' WHERE ID=$contactId";
                if ($result = $conn->query($sql) != TRUE)
                {
                    returnWithError("Couldn't update contact");
                }
                returnWithSuccess("Contact successfully updated!");
                $conn->close();
            }
            else
            {
                returnWithError("Could not find a contact to update with provided id");
                $conn->close();
            }
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
			$sql = "SELECT UserId FROM COP4331.Contacts where ID=$contactId";
			if ($result = $conn->query($sql) != TRUE)
			{
				returnWithError( "Couldn't find user to validate" );
			}
			else
			{
				if ($result->num_rows > 0)
				{
					$row = $result->fetch_assoc();
					$foreignKey = $row["userId"];
					// check if the foreignKey stored for this contact matches the current user's id
					if ($foreignKey === $userId)
					{
						$conn->close();
						return TRUE;
					}
					else
					{
						return FALSE;
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