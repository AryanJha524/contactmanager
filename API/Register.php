<?php

	$inData = getRequestInfo();

	$id = 0;
	$firstName = "";
	$lastName = "";
  $login = "";
  $password = "";

	$conn = new mysqli($servername, $username, $password, $dbname2);
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
