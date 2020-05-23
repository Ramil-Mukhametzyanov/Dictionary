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
 return  $file = $lang." (".$c.").js";
}

function save($lang){
 $content = $_POST["content_".$lang];
 if ($content == "") return;

 $c = get_config($lang) + 1;
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