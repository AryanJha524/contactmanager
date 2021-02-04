<?php

	$servername = "104.131.122.53";
	$username = "root";
	$password = "cop4331g5mysql";
	$dbname1 = "Users";
	$dbname2 = "Contacts";

	$inData = getRequestInfo();

	$id = 0;
	$firstName = "";
	$lastName = "";
  $login = "";
  $password = "";

	$conn = new mysqli($servername, $username, $password, $dbname1);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "insert into Users (firstName,lastName,login, password) VALUES ('" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["login"] . "','" . $inData["password"] ."')";
		$result = $conn->query($sql);

		sendResultInfoAsJson( "Profile Created" );

		$conn->close();
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

?>
