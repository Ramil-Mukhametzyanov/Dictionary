
function getCursorXY(e) {
 var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ?document.documentElement.scrollLeft : document.body.scrollLeft);
 var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
 if(X == -1 || Y == -1){
  X = x;
  eX = document.getElementById("info").offsetLeft;
  Y = y;
  eY = document.getElementById("info").offsetTop;
 }else{
  $("#info").css({left: eX-X+x, top: eY-Y+y});
 }
}

function ondown(){
 X = -1;
 Y = -1;
 func=getCursorXY;
 init();
}

function onup(){
 func=function(){};
 init();
}

function init() {
 if(window.Event){
  document.captureEvents(Event.MOUSEMOVE);
 }
 document.onmousemove = func;
 document.onmouseup=onup;
}

var X = -1;
var Y = -1;
var eX = 0;
var eY = 0;
func = function(){};