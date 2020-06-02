<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<script src="jquery.min.js"></script>
<script src="proc.js"></script>
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

function load_jfile_old($lang){
 echo "<script src='";
 echo jfile($lang,get_config($lang));
 echo "'></script>";
}

function load_jfile($lang){
 echo "<script>";
 readfile(jfile($lang,get_config($lang)));
 echo "</script>";
}


load_jfile("TT");
load_jfile("RU");

?>
</head>
<body>
<script>
 var Status = {'TT': 0, 'RU': 0};
 function Change(lang){
  replace_shy("txt_"+Lang);
  var w = document.getElementById('txt_'+lang).value
  $("#uni_"+lang)[0].innerHTML = anaLyze(w, lang);
  resize(lang);
  if(Status[lang]) setTimeout("Change('" + lang + "')",100);
 }

$(document).ready(function(){
 

  
 $("#txt_TT").focus(function(){
  $(this).css("background-color","#FFFF00");
  Status['TT'] = 1;
  Change('TT');
  $("#key_RU").hide();
  $("#key_TT").show();
  })

 $("#txt_TT").blur(function(){
  $(this).css("background-color","#AAAA00");
  Status['TT'] = 0;
  Langs['TT'].cursor = $("#txt_TT").prop("selectionStart");
  console.log("cursor: " + Langs['TT'].cursor);
 });

 $("#txt_RU").focus(function(){
  $(this).css("background-color","#00FFFF");
  Status['RU'] = 1;
  Change('RU');
  $("#key_TT").hide();
  $("#key_RU").show();
  })

 $("#txt_RU").blur(function(){
  $(this).css("background-color","#00AAAA");
  Status['RU'] = 0;
  Langs['RU'].cursor = $("#txt_RU").prop("selectionStart");
  console.log("cursor: " + Langs['RU'].cursor);
 });


 $("#info").hide();
 $("#key_TT").hide()
 showAlphabet("TT");
 $("#key_TT").mouseover(function(){
  $("#txt_TT").css("background-color","#FFFF00");
  $("#txt_RU").css("background-color","#00AAAA");
 });


 $("#key_RU").hide();
 showAlphabet("RU");
 $("#key_RU").mouseover(function(){
  $("#txt_RU").css("background-color","#00FFFF");
  $("#txt_TT").css("background-color","#AAAA00");
 });

 $("#label_RU").attr('data-title', Langs["RU"].WordsArray.length);  
 document.getElementById("count_TT").innerHTML = Langs["TT"].WordsArray.length;
 $("#count_TT").hide();
 $("#label_TT").mouseover(function(){
  document.getElementById("count_TT").innerHTML = Langs["TT"].WordsArray.length;
  $("#count_TT").show();
 });
 $("#label_TT").mouseout(function(){
  $("#count_TT").hide();
 });
 document.getElementById("count_RU").innerHTML = Langs["RU"].WordsArray.length;
 $("#count_RU").hide();
 $("#label_RU").mouseover(function(){
  document.getElementById("count_RU").innerHTML = Langs["RU"].WordsArray.length;
  $("#count_RU").show();
 });
 $("#label_RU").mouseout(function(){
  $("#count_RU").hide();
 });

 
});
 var Edit = {'TT': 0, 'RU': 1};
 function toggle(l){
  for(i in Edit){
   if(i != l) $("#key_"+i).hide();
  }
  if(Edit[l] == 1){
   Edit[l] = 0;
   $("#txt_"+l).hide();
   $("#key_"+l).hide();
   Change(l);
  }else if(Edit[l] == 0){ 
   Edit[l] = 1;
   resize(l);
   $("#txt_"+l).show();
   $("#key_"+l).show();
   $("#info").hide();
  }else Edit[l] = 0;
 }
 var Size = {'TT': 0, 'RU': 0};
 function resize(l){
  document.getElementById('txt_'+l).style.height='auto';
  var h = document.getElementById('txt_'+l).scrollHeight;
  if(h == 0) h = Size[l];
  Size[l] = h;
  console.log('h: ' + h);
  if(h < 450) h = 450;
  document.getElementById('txt_'+l).style.height=h+"px";
 }
</script>
<table style="position: absolute;left: 100px; top: 40px;">

<tr><td>
 <div class = container>
  <table><tr><td>
   <div class=tbtn id=new_TT onclick="clearText('TT');">New</div>
  </td><td>
  <div class=tbtn id=load_TT onclick="loadText('TT');">Load</div>
  </td></tr></table>
 </div>
 <div class = container>
  <div class=label id=label_TT onclick="toggle('TT');"><center>TT</center>
   <div id=count_TT></div>
  </div>
 </div>
 <div class = container>
  <div class = box id=uni_TT></div>
 </div>
 <div class = container>
  <textarea type="text" onchange="save('TT');" spellcheck="false" class=input id=txt_TT></textarea>
 </div>
 <div class = container>
  <div class = key id=key_RU></div>
 </div>
</td><td>
 <div style="position: absolute; top: 3px; left: 505px">
  <table><tr><td>
   <div class=tbtn id=new_RU onclick="clearText('RU');">New</div>
  </td><td>
  <div class=tbtn id=load_RU onclick="loadText('RU');">Load</div>
  </td></tr></table>
 </div>
 <div class = container>
  <div class=label id=label_RU onclick="toggle('RU');"><center>RU</center>
   <div id=count_RU></div>
  </div>
 </div>
 <div class = container>
  <div class = box id=uni_RU></div>
 </div>
 <div class = container>
  <textarea type="text" onchange="save('RU');" spellcheck="false" class=input id=txt_RU></textarea>
 </div>
 <div class = container>
  <div class = key id=key_TT></div>
 </div>
</td></tr>
</table>
<div id=menu>
<?php
  $folder = $_SERVER['PHP_SELF'];
  if($folder == "/index.php") echo '<a href="/test">Test</a>';
  if($folder == "/test/index.php") echo '<a href="/">Back</a>';
?>
 <div class=box id=info></div>
 <div class=btn id=more onclick="Info();"><br>More/Less Info</div>
 <div class=btn id=add onclick="addAll();"><br>Add all</div>
 <div class=btn id=get onclick="GetWord();"><br>Get</div>
 <div class=box id=list>
 <div class=box id=Pa><br>List 50</div>
 <div>
  <table cellspacing=5px><tr>
   <td><div style="font-size: 45px;" onclick="GetPage(-1);">&lt;</div></td>
   <td><div style="font-size: 45px;" onclick="GetPage(1);">&gt;</div></td>
  </tr></table> 
  +/- 10
  <table cellspacing=5px><tr>
   <td><div style="font-size: 45px;" onclick="GetPage(-10);">&lt;</div></td>
   <td><div style="font-size: 45px;" onclick="GetPage(10);">&gt;</div></td>
  </tr></table>
  +/- 100
  <table cellspacing=5px><tr>
   <td><div style="font-size: 45px;" onclick="GetPage(-100);">&lt;</div></td>
   <td><div style="font-size: 45px;" onclick="GetPage(100);">&gt;</div></td>
  </tr></table>
 </div>
</div>


<script src="text.js"></script>
<script src="dict.js"></script>

</body>
</html>
</html>