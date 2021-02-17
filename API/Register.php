<?php

	$servername = "localhost";
	$username = "Aryan";
	$password = "testing321";
	$dbname = "COP4331";

	$inData = getRequestInfo();

	$id = 0;
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
  $login = $inData["login"];
  $password = $inData["password"];

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "insert into Users (firstName,lastName,login, password) VALUES ('" . $firstName . "','" . $lastName . "','" . $login . "','" . $password ."')";
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
