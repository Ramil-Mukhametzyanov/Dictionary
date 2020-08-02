function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Hello, " + user + "!");
    loadProfile(user);
  } else {
    user = prompt("What is your name?", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

profile = [];
function loadProfile(user) {
 var xhr = new XMLHttpRequest();
 var body = 'm=' + encodeURIComponent("load");
 body += '&user=' + encodeURIComponent(user);
 xhr.open("POST", 'users.php', true);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.onreadystatechange = function(){
  if(xhr.readyState == XMLHttpRequest.DONE){
   alert("loaded " + user + "'s profile" + "\n" + xhr.responseText);
    profile= xhr.responseText.split(',');

  }
 }
 xhr.send(body);
}
