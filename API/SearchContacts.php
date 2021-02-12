<?php

	$servername = "104.131.122.53";
	$username = "root";
	$password = "cop4331g5mysql";
	$dbname1 = "Users";
	$dbname2 = "Contacts";

	$inData = getRequestInfo();

	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli($servername, $username, $password, $dbname2);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "select firstName, lastName, phoneNumber, email from Contacts where firstName like '%" . $inData["search"] . "%' and where lastName like '%" . $inData["search"] . "%' and where phoneNumber like '%" . $inData["search"] . "%' and where email like '%" . $inData["search"] . "%' and UserID=" . $inData["userId"];
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc())
			{
				if( $searchCount > 0 )
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '"' . $row["firstName"] . $row["lastName"] . $row["phoneNumber"] . $row["email"] '"';
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
		$retValue = '{"results":[''],error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
