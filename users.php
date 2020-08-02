<?php

function tfile($user){
 return "users/" . $user . ".txt";
}

function get_profile($user){
 readfile(tfile($user));
}

function save_text($lang, $text){
 file_put_contents(tfile($lang), $text); 
}


$m = strval($_POST["m"]);
$user = strval($_POST["user"]);

if($m == "load"){
 get_profile($user);
}

if($m == "save"){
 $text = $_POST["text"];
 if($text != ""){
  save_text($lang, $text);
 }
}

?>