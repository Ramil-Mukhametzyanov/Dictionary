function saveWord(lang, word) {
 var text = document.getElementById("txt_" + lang).value;

 console.log("Save to server(" + lang + "): " + word.name);
 var xhr = new XMLHttpRequest();
 var body = 'lang=' + encodeURIComponent(lang);
 body += '&word=' + encodeURIComponent(word.name);
 body += '&state=' + encodeURIComponent(word.state);
 body += '&verify=' + encodeURIComponent(word.verify);
 body += '&frequency=' + encodeURIComponent(word.count);

 xhr.onreadystatechange = function(){};
 xhr.open("POST", 'dict.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}

function saveDictToServer(){
 var f = 0;
 var body = "";
 for(l in Langs){
  Lang = l;
  console.log("Save "+l); 
  if(f == 0) f = 1;
  else body += "&";
  body += "content_" + Lang + "=" + getDictionary('D');
 }
 var xhr = new XMLHttpRequest();
 xhr.open("POST", 'save.php', true);
 xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
 xhr.send(body);
}

saveDictToServer();