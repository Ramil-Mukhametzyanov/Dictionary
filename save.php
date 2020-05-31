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

function new_config($c){
 if($c == 0) return 0;
 else return $c + 1;
}

function jfile($lang, $c){
 if($c == 0) $file = $lang.".js";
 else $file = $lang." (".$c.").js";
 return  $file;
}

function save($lang){
 $content = $_POST["content_".$lang];
 if ($content == "") return;

 $c = new_config(get_config($lang));
 $file = jfile($lang, $c);

 echo "SAVE<BR>";
 print "config = '". $c . "'<BR>";
 print "file name = '". $file . "'<BR>";
 echo "content:<br>" . $content;
 echo '<br>';
 echo '<br>';

 file_put_contents(cfile($lang), $c); 
 file_put_contents($file, $content);
}

save('TT');
save('RU');

echo "<script>window.close()</script>";

?>