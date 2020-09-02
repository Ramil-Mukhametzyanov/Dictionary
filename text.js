function replace(w,index,replacement){
 return w.substr(0, index) + replacement + w.substr(index+1,w.length);
}



function replace_shy(id){
 
var w = document.getElementById(id).value;
 do{
  var p = w.indexOf("\u00AD");
  if(p>=0) w=replace(w,p,"");
 }while(p>=0);
 
document.getElementById(id).value=w;
}

function copyText(lang) {
 if(lang == '') lang = Llang;
 var obj =  document.getElementById("txt_" + lang);
 var e = Edit[lang];
 if(e == 0) toggle(lang);
 obj.focus();
 obj.select();

 document.execCommand('copy');
 obj.selectionStart = 0;
 obj.selectionEnd = 0;
 if(e == 0) toggle(lang);
 console.log("copied: " + lang);
}

function clearText(lang) {
 if(lang == '') lang = Llang;
 document.getElementById("txt_" + lang).value = "";
}

function loadText(lang) {
 if(lang == '') lang = Llang;
 var xhr = new XMLHttpRequest();
 var body = 'm=' + encodeURIComponent("load");
 body += '&lang=' + encodeURIComponent(lang);
 xhr.open("POST", 'text.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.onreadystatechange = function(){
  if(xhr.readyState == XMLHttpRequest.DONE){
   document.getElementById("txt_" + lang).value = xhr.responseText;
  }
 }
 xhr.send(body);
}

function save(lang) {
 var text = document.getElementById("txt_" + lang).value;
 var xhr = new XMLHttpRequest();
 var body = 'm=' + encodeURIComponent("save");
 body += '&lang=' + encodeURIComponent(lang);
 body += '&text=' + encodeURIComponent(text);
 xhr.onreadystatechange = function(){};
 xhr.open("POST", 'text.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}

var DELAY = 20000;
var PERIOD = 500;
function auto_save(lang){
  save(lang);
  setTimeout("auto_save('" + lang  + "');", profile.length*PERIOD);
}

for(var i=0; i < profile.length; i++){
 setTimeout("auto_save('" + profile[i] + "');", DELAY+i*PERIOD);
}

