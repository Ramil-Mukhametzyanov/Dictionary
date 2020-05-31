<?php

function cfile($lang){
 return "config_" . $lang;
}

function get_config($lang){
 $cfile = cfile($lang);
 $file_handle = fopen($cfile, "r") or die("Unable to open file!");
 $c = fgets($file_handle);
 fclose($file_handle);
 return $c;
}

function jfile($lang, $c){
 if($c == 0) $file = $lang.".js";
 else $file = $lang." (".$c.").js";
 return  $file;
}

function save_word($lang, $text){
 $c = get_config($lang);
 $file = jfile($lang, $c);
 file_put_contents($file, $text, FILE_APPEND | LOCK_EX); 

 echo "\n". $c;
 echo "\n". $file;
 echo "\n". $text;

}

function proc(){
 if($_POST["state"] != 'def'){
  $code = "\r\nD({'c':'" . $_POST["word"] . "','e':'0','f':'1'});";
 }else{
  $code = "\r\nD({'c':'" . $_POST["word"] . "','e':'" . $_POST["verify"] . "','f':'0'});";
 }
 save_word($_POST["lang"], $code);
}

proc();

?>