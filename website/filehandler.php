<?php

function fileWrite($file, $message) {
	fwrite(fopen($file, 'a'), $message . "\n");
}

function fileRead($file){
	$lines = file($file);
	foreach ($lines as $line_num => $line) {
		echo  $line,  '</br>';
	}
}

?>