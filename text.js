function clearText(lang) {
 document.getElementById("txt_" + lang).value = "";
}

function loadText(lang) {
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
var HALF_PERIOD = 500;
function auto_save(lang){
  save(lang);
  setTimeout("auto_save('" + lang  + "');", 2*HALF_PERIOD);
}

setTimeout("auto_save('TT');", DELAY+HALF_PERIOD);
setTimeout("auto_save('RU');", DELAY+2*HALF_PERIOD);

