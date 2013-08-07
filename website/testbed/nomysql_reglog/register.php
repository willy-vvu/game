<?php

function fileWrite($file, $message) {
	$current = file_get_contents($file);
	$current .= $message;
	$current .= "\r\n";
	file_put_contents($file, $current);
}

function fileRead($file){
	$lines = file($file);
	$rlines = "";
	foreach ($lines as $line_num => $line) {
		$rlines .= $line;
		$rlines .= "\n";
	}
}

function isEmpty($variable) {
	if($variable == "") {
		return true;
	} else {
		return false;
	}
}

function contains($full, $section) {
	if(strpos($full, $section) === false) {
		return false;
	} else {
		return true;
	}
}

function validateUser($username, $password) {
	if(!isEmpty($username) && !isEmpty($password)) {
		return true;
	} else{
		return false;
	}
}

function existsUser($username) {
	//$lines = fileRead("users.txt");
	return false;//override checking
}

function addUser($username, $password) {
	fileWrite("users.txt", "username:" . $username);
	fileWrite("users.txt", "password:" . $password);
}

function run() {
	$username = $_POST["username"];
	$password = $_POST["password"];
	
	if(validateUser($username, $password)) {
		if(!existsUser($username)) {
			addUser($username, $password);
			echo "Your account has been created";
		} else {
			echo "The username you picked already exists";
		}
	} else {
		echo "One or more required fields were left blank";
	}
}

run();
?>