<?php
function success() {
	echo "Your account has been created.";
}
function failure($reason) {
	echo $reason;
}
function isEmpty($variable) {
	if($variable == "") {
		return true;
	} else {
		return false;
	}
}
function createDataTable() {
	$con = mysqli_connect("DOMAIN","USERNAME","PASSWORD","TABLE");
	
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	
	$sql="CREATE TABLE users(PID INT NOT NULL AUTO_INCREMENT,PRIMARY KEY(PID),
	Username CHAR(15),
	Password CHAR(15),
	Email CHAR(15),
	Age INT
	)";
	
	if (mysqli_query($con,$sql)) {
		echo "Table users created successfully";
	} else {
		echo "Error creating table: " . mysqli_error();
	}
}
function validateResults() {
	$username = $_POST["username"];
	$password = $_POST["password"];
	$confirm_password = $_POST["confirm_password"];
	$email = $_POST["email"];
	$age = $_POST["age"];
	$error = "";
	
	if(isEmpty($username) || isEmpty($password) || isEmpty($confirm_password) || isEmpty($email) || isEmpty($age)) {
		$error += "One or more of the required fields are empty. ";
	}
	if($password != $confirm_password) {
		$error += "The passwords do not match. ";
	}
	if(strpos($email, "@") === false) {
		$error += "The email is invalid. ";
	}
	$sql = "SELECT * FROM scope WHERE Username = '" . mysql_real_escape_string($username) . "'";
	$result = mysql_query($sql) or die('error');
	$row = mysql_fetch_assoc($result);
	if(mysql_num_rows($result)) {
		$error += "Username is already taken. ";
	}
	if(!isEmpty($error)) {
		failure($error);
	} else {
		//Add names to database
		$con = mysqli_connect("DOMAIN","USERNAME","PASSWORD","TABLE");
		if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
	mysqli_query($con,"INSERT INTO scope (Username, Password, Email, Age)VALUES ('" . mysql_real_escape_string($username) . "', '" . mysql_real_escape_string($password) . "','" . mysql_real_escape_string($email) . "','" . mysql_real_escape_string($age) . "')");
	mysqli_close($con);
	success();
	}
}
validateResults();
?>