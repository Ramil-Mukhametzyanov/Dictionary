<?php

function cfile($user, $lang){
 return $user . "/" . $lang ."/" . "config_" . $lang;
}

function get_config($user, $lang){
 $cfile = cfile($user, $lang);
 $file_handle = fopen($cfile, "r") or die("Unable to open file!");
 $c = fgets($file_handle);
 fclose($file_handle); 
 return $c;
}

function new_config($c){
 if($c == 0) return 0;
 else return $c + 1;
}

function jfile($user, $lang, $c){
 if($c == 0) $file = $lang.".js";
 else $file = $lang . " (".$c.").js";
 return  $user . "/" . $lang . "/" . $file;
}

$user = $_POST["user"];



function save($user, $lang){
 $content = $_POST["content_".$lang];
 if ($content == "") return;

 $c = new_config(get_config($user, $lang));
 $file = jfile($user, $lang, $c);

 echo "SAVE<BR>";
 print "config = '". $c . "'<BR>";
 print "file name = '". $file . "'<BR>";
 echo "content:<br>" . $content;
 echo '<br>';
 echo '<br>';

 file_put_contents(cfile($user, $lang), $c); 
 file_put_contents($file, $content);
}


$file = fopen("languages/list.txt","r");
$string = fgets($file);
$langs = explode (",", $string);
print_r($langs);
fclose($file);

for($i = 0; $i < count($langs); $i++){
 save($user, $langs[$i]);
}

?>