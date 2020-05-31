function load(lang) {
 var xhr = new XMLHttpRequest();
 var body = 'm=' + encodeURIComponent("load");
 body += '&lang=' + encodeURIComponent(lang);
 xhr.open("POST", 'text.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.onreadystatechange = function(){
  if(xhr.readyState == XMLHttpRequest.DONE){
   console.log("Load from server(" + lang + "):\n" + xhr.responseText);
   document.getElementById("txt_" + lang).value = xhr.responseText;
  }
 }
 xhr.send(body);
}

function save(lang) {
 var text = document.getElementById("txt_" + lang).value;

 console.log("Save to server(" + lang + "):\n" + text);
 var xhr = new XMLHttpRequest();
 var body = 'm=' + encodeURIComponent("save");
 body += '&lang=' + encodeURIComponent(lang);
 body += '&text=' + encodeURIComponent(text);
 xhr.onreadystatechange = function(){};
 xhr.open("POST", 'text.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}

function auto_save(lang){
  save(lang);
  setTimeout("auto_save('" + lang  + "');", 100);
}

auto_save("TT");
auto_save("RU");

