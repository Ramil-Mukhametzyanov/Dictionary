<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
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
 return  $file = $lang." (".$c.").js";
}

function load_jfile($lang){
 echo "<script src='";
 echo jfile($lang,get_config($lang));
 echo "'></script>";
}

load_jfile("TT");
load_jfile("RU");

?>
</head>
<body>
<script>
 var Status = {'TT': 0, 'RU': 0};
 function Change(lang){
//  console.log('Status:' + Status[lang] + "\n");
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

 $("#c_RU").attr('title', Langs["RU"].WordsArray.length);  
 $("#c_TT").attr('title', Langs["TT"].WordsArray.length);  
 
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
  <div class=label id=label_TT onclick="toggle('TT');"><a id=c_TT href=# title=""><center>TT</center></a></div>
 </div>
 <div class = container>
  <div class = box id=uni_TT></div>
 </div>
 <div class = container>
  <textarea type="text" spellcheck="false" class=input id=txt_TT></textarea>
 </div>
 <div class = container>
  <div class = key id=key_RU></div>
 </div>
</td><td>
 <div class = container>
  <div class=label id=label_RU onclick="toggle('RU');"><a id=c_RU href=# title=""><center>RU</center></a></div>
 </div>
 <div class = container>
  <div class = box id=uni_RU></div>
 </div>
 <div class = container>
  <textarea type="text" spellcheck="false" class=input id=txt_RU></textarea>
 </div>
 <div class = container>
  <div class = key id=key_TT></div>
 </div>
</td></tr>
</table>
<div id=menu>
 <div class=box id=info></div>
  <form id=form action="save.php" method="POST" onsubmit="return saveToServer();" target="_blank">
   <input id=content_TT hidden name="content_TT" value="">
   <input id=content_RU hidden name="content_RU" value="">
   <input class=btn id=save value=Save type=submit>
  </form>

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

<!--
<script>
 L('RU');
 PrepareToSave();
 L('TT');
</script>
-->


</body>
</html>