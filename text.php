<?php

function tfile($lang){
 return "text_" . $lang . ".txt";
}

function get_text($lang){
 readfile(tfile($lang));
}

function save_text($lang, $text){
 file_put_contents(tfile($lang), $text); 
}


$m = strval($_POST["m"]);
$lang = strval($_POST["lang"]);

if($m == "load"){
 get_text($lang);
}

if($m == "save"){
 $text = $_POST["text"];
 if($text != ""){
  save_text($lang, $text);
 }
}

?>