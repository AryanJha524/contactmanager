<?php

	$servername = "localhost";
	$username = "Aryan";
	$password = "testing321";
	$dbname = "COP4331";

	$inData = getRequestInfo();
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT * FROM COP4331.Contacts WHERE firstName LIKE '%" . $inData["search"] . "%' OR lastName like '%" . $inData["search"] . "%' OR phoneNumber like '%" . $inData["search"] . "%' OR email like '%" . $inData["search"] . "%' AND UserID=" . $inData["userId"];
		echo($sql);
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",\n";
				}
				$searchCount++;
				$searchResults .= '"' . $row["ID"] . '""' . $row["firstName"] . '""' . $row["lastName"] . '""' . $row["phoneNumber"] . '""' . $row["email"] . '""' . $row["userID"];
			}
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}

	returnWithInfo( $searchResults );

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
		$retValue = '{error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . ']}';
		sendResultInfoAsJson( $retValue );
	}

?>
