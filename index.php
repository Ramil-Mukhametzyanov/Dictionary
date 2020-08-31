<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<script src="jquery.min.js"></script>
<script src="proc.js"></script>
<script src="move.js"></script>
<script src="switch.js"></script>
<script src="users.js"></script>
<?php

$user = $_GET['username'];
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

function load_jfile_old($lang){
 echo "<script src='";
 echo jfile($lang,get_config($lang));
 echo "'></script>";
}

function load_jfile($user,$lang){
 echo "<script>";
 readfile(jfile($user,$lang,get_config($user,$lang)));
 echo "</script>";
}
$profile = $_GET['profile'];
echo "<script>";
echo "var profile = [];";
echo "var Status = {};";
for($i=0; $i<count($profile); $i++){
 echo "profile[" . $i. "] = '" . $profile[$i] . "';";
 echo "Status." . $profile[$i] . "=0;";
}
echo "</script>";

for($i=0; $i<count($profile); $i++){
 load_jfile($user,$profile[$i]);
}
?>


</head>
<body>
<script>
 Llang = profile[0];
 Llang_index=0;
 console.log(Status);
// var Status = {'BA': 0, 'TT': 0, 'RU': 0};
 function Change(lang){
  replace_shy("txt_"+Lang);
  var w = document.getElementById('txt_'+lang).value
  $("#uni_"+lang)[0].innerHTML = anaLyze(w, lang);
  resize(lang);
  if(Status[lang]) setTimeout("Change('" + lang + "')",100);
 }

$(document).ready(function(){
/*
 
 for(x in Status){
  $("#txt_" + x).blur = "$(this).css(\"background-color\",\"#AAAA00\");   Status[" + x + "] = 0;   Langs[" + x + "].cursor = $(\"#txt_\" + " + x + ").prop(\"selectionStart\");   console.log(\"cursor: \" + Langs[" + x + "].cursor);"; 

  $("#txt_" + x).focus="   $(this).css(\"background-color\",\"#FFFF00\");   Status[" + x + "] = 1;   for(y in Status){    if(y == " + x + ")    $(\"#key_\" + " + x + ").show();    else     $(\"#key_\" + y).hide();   }";

}

*/
/*
  
function find_param1(l){
 if(l == "TT") return colors1.TT;
 if(l == "RU") return colors1.RU;
}

var colors2 = {"TT": "#AAAA00" ,"RU": "#00AAAA" }
function find_param2(l){
 if(l == "TT") return colors2.TT;
 if(l == "RU") return colors2.RU;
}

function show_key(l){
  $(this).css("background-color",find_param1(l));
  Status[l] = 1;
  for(var i = 0; i < profile.length; i++){
   if(profile[i] == l)  $("#key_"+l).show();
   else $("#key_"+profile[i]).hide();
  }
}

function blur_key(l){
  $(this).css("background-color",find_param2(l));
  Status[l] = 0;
  Langs[l].cursor = $("#txt_"+l).prop("selectionStart");
  console.log("cursor: " + Langs[l].cursor);
}

function init_lang_form(l){

 $("#txt_"+l).focus = "function (){show_key('" + l + "')";
 $("#txt_"+l).blur = "function (){blur_key('" + l + "')";
}

init_lang_form("TT");

*/

var colors1 = {"TT": "#FFFF00","RU": "#00FFFF", "EN": "#7777FF" }
var colors2 = {"TT": "#AAAA00" ,"RU": "#00AAAA", "EN": "#7777AA" }


 function Focus(l){
  document.getElementById("txt_"+l).style.background=colors1[l];
  Status[l] = 1;
  for(var i = 0; i < profile.length; i++){
   if(profile[i] == l) document.getElementById("txt_"+l).style.display = "block";
   else document.getElementById("txt_"+profile[i]).style.display = "none";
  }
 }

 function Blur(l){
  var el = document.getElementById("txt_" + l);
  el.style.background=colors2[l];
  Status[l] = 0;
  Langs[l].cursor = el.selectionStart;
  console.log("cursor: " + Langs[l].cursor);
 }

 function Key(l){
  var el = document.getElementById('key_'+l);
  el.style.display="none"; 
  showAlphabet(l);
 
 }
 function CountToggle(l, mode){
  var el = document.getElementById('count_' + l);
  if(mode == "hide") el.style.display = "none";
  if(mode == "show"){
   el.innerHTML = Langs[l].WordsArray.length;
   el.style.display = "block";
  }
 }
 

 $("#info").hide();


<?php
for($i=0; $i<count($profile); $i++){
 $lang = $profile[$i];
 echo "  Key('" . $lang . "');\n";
 echo "  var el = document.getElementById('txt_" . $lang . "');
\n";
 echo "  el.onfocus = function(){ Focus('" . $lang . "');};\n";
 echo "  el.onblur = function(){ Blur('" . $lang . "');}\n";
 echo " CountToggle('" . $lang . "','hide');\n";
 echo " var el = document.getElementById('label_" . $lang . "');\n";
 echo " el.onmouseover = function(){ CountToggle('" . $lang . "','show');}\n";
 echo " el.onmouseout = function(){ CountToggle('" . $lang . "','hide');}\n";
}
?>



});
 var Edit = {'BA': 1, 'TT': 1, 'RU': 1};
 function toggle(cl){
  for(i in Edit){
   if(i != cl){
    $("#key_"+i).hide();
   }
  }
  if(Edit[cl] == 1){
   Edit[cl] = 0;
   $("#txt_"+cl).hide();
   $("#key_"+cl).hide();
   Change(cl);
  }else if(Edit[cl] == 0){ 
   Edit[cl] = 1;
   resize(cl);
   $("#txt_"+cl).show();
   $("#key_"+cl).show();

   resize(cl);
   $("#info").hide();
  }else Edit[cl] = 0;
 }
 var Size = {'BA': 0, 'TT': 0, 'RU': 0};
 function resize(l){
  document.getElementById('txt_'+l).style.height='auto';
  var h = document.getElementById('txt_'+l).scrollHeight;
  if(h == 0) h = Size[l];
  Size[l] = h;
  if(h < 450) h = 450;
  document.getElementById('txt_'+l).style.height=h+"px";
 }
 function Reload(l){
  if(l == '') l = Llang;
  Status[l] = 1;
  Change(l);
  Status[l] = 0;
 }

 function SE(){
  console.log("Status:");
  console.log(Status);
  console.log("Edit:");
  console.log(Edit);
  setTimeout("SE();", 1000)
 }
</script>
<table cellpadding=0 cellspacing=0 style="position: absolute;left: 100px; top: 40px;">

<tr><td>
 <div class = container>
  <table><tr><td>
   <div class=tbtn id=new_left onclick="clearText(''); Reload('');">New</div>
  </td><td>
   <div class=tbtn id=load_left onclick="loadText(''); Reload('');">Load</div>
  </td><td>
   <div class=tbtn id=copy_left onclick="copyText('');">Copy</div>
  </td><td>
   <div class=tbtn id=switch_left onclick="Switch();">Lang</div>
  </td></tr></table>
 </div>
<div id=interface_BA style="display: none">
 <div class = container>
  <div class=label id=label_BA onclick="toggle('BA');"><center>BA</center>
   <div class=count id=count_BA></div>
  </div>
 </div>
 <div class = container>
  <div class = box id=uni_BA></div>
 </div>
 <div class = container>
  <textarea type="text" onchange="save('BA');" spellcheck="false" class=input id=txt_BA></textarea>
 </div>
</div>
<div id=interface_TT  style="display: none">
 <div class = container>
  <div class=label id=label_TT onclick="toggle('TT');"><center>TT</center>
   <div class=count id=count_TT></div>
  </div>
 </div>
 <div class = container>
  <div class = box id=uni_TT></div>
 </div>
 <div class = container>
  <textarea type="text" onchange="save('TT');" spellcheck="false" class=input id=txt_TT></textarea>
 </div>
</div>
<div id=interface_EN  style="display: none">
 <div class = container>
  <div class=label id=label_EN onclick="toggle('EN');"><center>EN</center>
   <div class=count id=count_EN></div>
  </div>
 </div>
 <div class = container>
  <div class = box id=uni_EN></div>
 </div>
 <div class = container>
  <textarea type="text" onchange="save('EN');" spellcheck="false" class=input id=txt_EN></textarea>
 </div>
</div>

<div id=interface_RU>
 <div class = container>
  <div class=label id=label_RU onclick="toggle('RU');"><center>RU</center>
   <div class=count id=count_RU></div>
  </div>
 </div>
 <div class = container>
  <div class = box id=uni_RU></div>
 </div>
 <div class = container>
  <textarea type="text" onchange="save('RU');" spellcheck="false" class=input id=txt_RU></textarea>
 </div>
</div>

</td><td>
 <div class = container>
  <div class = key id=key_TT></div>
 </div>
 <div class = container>
  <div class = key id=key_BA></div>
 </div>
 <div class = container>
  <div class = key id=key_RU></div>
 </div>
 <div class = container>
  <div class = key id=key_EN></div>
 </div>
</td></tr>
</table>
<div id=menu>
 <div class=box onmousedown="ondown();" id=info></div>
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
 <br>
<table cellpadding=10px><tr><td>
<!--
<?php 
 $a = jfile("RU",get_config("RU"));
 echo '<a target=_blank download="RU.dict" href="'.$a.'">RU</a>';
?>
</td></tr><tr><td>
<?php 
 $a = jfile("TT",get_config("TT"));
 echo '<a target=_blank download="TT.dict" href="'.$a.'">TT</a>';
?>
</td></tr><tr><td>
<?php 
 $a = jfile("BA",get_config("BA"));
 echo '<a target=_blank download="BA.dict" href="'.$a.'">BA</a>';
?>
</td></tr></table>
 <br>
<?php
  $folder = $_SERVER['PHP_SELF'];
  if($folder == "/index.php") echo '<a href="/test">Test</a>';
  if($folder == "/test/index.php") echo '<a href="/">Back</a>';
?>
-->
</body>
</html>
</html>