<?php
    $inData = getRequestInfo();
    $contactId = $inData["id"];
    $userId = $inData["userId"];

    // connecting to the database
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        if (validateUser($contactId, $userId) != true)
		{
			returnWithError("User not authorized to update contact");
        }
        else
        {
            // find the contact to update and extract its fields
            $sql = "SELECT ID,firstName,lastName, email, phoneNumber FROM Users where id='" . $contactId . "'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                $row = $result->fetch_assoc();
                $oldFirstName = $row["firstName"];
                $oldLastName = $row["lastName"];
                $oldEmail = $row["email"];
                $oldPhoneNumber = $row["phoneNumber"];

                // set updated values that we will insert to either the new value or the old one (if no new info was provided on the update form)
                $updatedFirstName = ($inData["newFirstName"] !== '') ? $inData["newFirstName"] : $oldFirstName;
                $updatedLastName = ($inData["newLastName"] !== '') ? $inData["newLastName"] : $oldLastName;
                $updatedEmail = ($inData["newEmail"] !== '') ? $inData["newEmail"] : $oldEmail;
                $updatedPhoneNumber = ($inData["newPhoneNumber"] !== '') ? $inData["newPhoneNumber"] : $oldPhoneNumber;

                // perform an SQL to update the desired contact
                $sql = "UPDATE Contacts SET firstName='".$updatedFirstName."',lastName='".$updatedLastName."',email='".$updatedEmail."',phoneNumber='".$updatedPhoneNumber."' WHERE id=".$contactId;
                if ($result = $conn->query($sql) != TRUE)
                {
                    returnWithError($conn->error);
                }
                $conn->close();
                returnWithSuccess("Contact successfully updated!");
            }
            else
            {
                returnWithError("Could not find a contact to update with provided id");
            }
        }

    }

    // TODO: add function to validate this user created this contact
    // can do by finding the foreign id of this contact and matching with given user id
    function validateUser()
    {
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