<?php
$rad;
$un = $_POST["username"];
$pw = $_POST["psw"];
$file = 'stuff/acnts.txt';
$search = $un;

$ontents = file_get_contents($file);
$contents = explode("\n", $ontents);
for($r = 0; $r <= sizeof($contents); $r++){
	$rad = explode(":", $contents[$r]);
	if($rad[0] == $un){
		$r = sizeof($contents);
	}
}

if($rad[1] == $pw){
	echo "change";
}else{
	echo "Incorrect username or password!";
}
?>