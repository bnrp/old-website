<?php

$un = $_POST["username"];

$mess = $_POST["mess"];



if($mess !== ""){
	fwrite(fopen("chatlog.txt", 'a'), "\n"."<span id=".$un.">"$un.": ".$mess."</span><br>");
}

$ontents = file_get_contents("chatlog.txt");

echo $ontents;

?>