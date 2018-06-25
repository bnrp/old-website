<?php

input = $_GET;

answerFile = file_get_contents("yeay.txt");

answers = answerFile.split("/n");

if(input["answer0"] == answers[0]){
	echo "swag";
}
?>