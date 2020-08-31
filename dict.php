<?php



function cfile($user,$lang){
 return $user."/".$lang."/"."config_" . $lang;
}

function get_config($user,$lang){
 $cfile = cfile($user,$lang);
 $file_handle = fopen($cfile, "r") or die("Unable to open file!");
 $c = fgets($file_handle);
 fclose($file_handle);
 return $c;
}

function jfile($user,$lang, $c){
 if($c == 0) $file = $lang.".js";
 else $file = $lang." (".$c.").js";
 return  $user."/".$lang."/".$file;
}

function save_word($user, $lang, $text){
 $c = get_config($user,$lang);
 $file = jfile($user,$lang, $c);
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
 save_word($_POST["user"], $_POST["lang"], $code);
}

proc();

?>