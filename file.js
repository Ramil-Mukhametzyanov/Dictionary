var H = {};

function getExtension(f){
 return f.substring(f.indexOf(".") + 1, f.length);
}

function load_dict(filename = ""){
 if(filename == ""){
  var scr = document.getElementById('dict');
  filename = scr.files[0].name;
 }
 var ext = getExtension(filename);
 var client = new XMLHttpRequest();
 client.open('GET', filename);
 if(ext == "txt"){
  client.onreadystatechange = function(){
   deCode(client.responseText,Langs[Lang].Dict);
  }
 }else if(ext == "js"){
  client.onreadystatechange = function(){
   eval(client.responseText);
  }
 }
 client.send()
}