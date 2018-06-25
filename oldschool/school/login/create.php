<html>
<body>
<?php
$rad;
$new = true;
$un = $_POST["username"];
$pw = $_POST["psw"];
$file = 'stuff/acnts.txt';
$search = $un;

if(strpos($un, ':') !== false){
	$new = false;
}

if(strpos($pw, ':') !== false){
	$new = false;
}

$ontents = file_get_contents($file);
$contents = explode("\n", $ontents);
for($r = 0; $r <= sizeof($contents); $r++){
	$rad = explode(":", $contents[$r]);
	if($rad[0] == $un){
		$new = false;
	}
}

if($new == true){
	fwrite(fopen($file, 'a'), "\n".$un.":".$pw);
	echo 'Account created!';
	window.location.href = "http://mrsawyer.info/students2/ben/login/loginpage.html";
}else{
	echo 'Why you try to trick me?';
}
?>
</body>
</html>