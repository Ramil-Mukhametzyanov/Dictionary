// 12:28 26.04.2020 (12:03-) 1h+15m+15m+15m

function new_d(){
 var v = new Object();
 v.define = function(){this.innerHTML = "<div style=\"width: " + this.w + "px; height: " + this.h + "px; background: " + this.c + "\"></div>";};
 v.set = function(h,w,c){this.h=h;this.w=w;this.c=c;this.define();}
 return v
}

var Alphabet = new Array(); 
var Dict = new Object();
var WordsArray = new Array();
var DeletedWordsArray = new Array();

function addToWordsArray(c){
 var p = WordsArray.length;
 WordsArray[p] = c;
 return p;
}

function isInDeletedWordsArray(c){
 var e = -1;
 for(var i = 0; i < DeletedWordsArray.length; i++){
  if(DeletedWordsArray[i] == c){
   e = c;
   break;
  }
 }
 return e;
}
function addToDeletedWordsArray(c){
 var p = isInDeletedWordsArray(c); 
 if(isInDeletedWordsArray(c) != -1) return p;
 var p = DeletedWordsArray.length;
 DeletedWordsArray[p] = c;
 return p;
}


var Lang = "";
function L(lang){

Lang = lang;
} 

function show(ind){
 alert(JSON.stringify(check(ind,0)) + "\n\n" + JSON.stringify(cur));
}

function add(ind){
 var d =new Object();
 d.name= ind;
 cur = Dict;
 for(var i =0; i < ind.length; i++){
  var ic = ind.substr(i,1);
  if(cur[ic])cur=cur[ic];
  else{ cur[ic] = new Object(); cur=cur[ic];}
 }
 if((cur.count != undefined) && (cur.verify != undefined)){
  cur.count = 1 + eval(cur.count);
  d.state="def";
  d.count=cur.count;
  d.verify=cur.verify;
 }else {
  cur.count=1;
  cur.verify=0;
  d.state="add";
  d.count=cur.count;
  d.verify=cur.verify;
  cur.pos = addToWordsArray(ind);
//  WordsArray[WordsArray.length] = ind;
 }
 return d;
}

function check(ind, value){
 var d =new Object();
 d.name= ind;
 cur = Dict;
 for(var i =0; i < ind.length; i++){
  var ic = ind.substr(i,1);
  if(cur[ic])cur=cur[ic];
  else{ d.state= "undef"; return d;}
 }
 if((cur.count != undefined) && (cur.verify != undefined)){
  cur.verify = eval(cur.verify)+eval(value);
  d.state="def";
  d.count=cur.count;
  d.verify=cur.verify;
  d.pos=cur.pos;
  if(d.verify < 0){
   addToDeletedWordsArray(ind);
   WordsArray[cur.pos] = "";
  }
 } else d.state="found";
 return d;
}

function D(Word){
 ind = Word.c;
 var d =new Object();
 d.name= ind;
 cur = Dict;
 for(var i =0; i < ind.length; i++){
  var ic = ind.substr(i,1);
  if(cur[ic])cur=cur[ic];
  else{ cur[ic] = new Object(); cur=cur[ic];}
 }
 if(!cur) cur = new Object();
 if((cur.count != undefined) && (cur.verify != undefined)){
  cur.count = 0 + eval(cur.count) + eval(Word.f);
//  cur.verify = eval(cur.verify) + eval(Word.e);
  d.state="def";d.count=cur.count;d.verify=cur.verify;}
 else {
  cur.count = Word.f; cur.verify = Word.e;
  cur.pos = addToWordsArray(Word.c);
  d.state="add";d.count=cur.count;d.verify=cur.verify;
 }
 return d;
}

var uString="";
var lString="";
var cString="";

function genAlphabet(){
 uString=""; lString=""; cString="";
 var f;
 for(var i = 0; i < Alphabet.length;i++){
  v="f = \"\\u" + Alphabet[i].l+ "\";";
  eval(v);
  Alphabet[i].lLetter = f;
  lString += f;

  v="f = \"\\u" + Alphabet[i].u+ "\";";
  eval(v);
  Alphabet[i].uLetter = f;
  uString += f;

  cString += Alphabet[i].c;
 }
}

function get_u(c){
 var t = "";
 for(var i = 0; i < c.length; i++){
  var n = c.substr(i,1);
  for(var j = 0; j < Alphabet.length; j++){
   if(n == Alphabet[j].c){ t+= Alphabet[j].Lletter; break;}
  }
 }
 alert(t);
}

function getCode(f){
v="";
for(var i=0;i< f.length;i++){
 var pos = lString.search(f.substr(i,1));
 if(f.substr(i,1) == '.') v+="_";
 else if(pos != -1) v += cString.substr(pos,1);
 else{
  var pos = uString.search(f.substr(i,1));
  if(pos != -1) v += cString.substr(pos,1);
  else v += "_";
 }
}
return v;
}
function getUni(f){
var v = "";
for(var i=0;i< f.length;i++){
 var z = f.substr(i,1);
 var pos = cString.search(z);
 if(pos != -1)
  v += lString.substr(pos,1);
 else v += z;
}
return v;
}


function getWordsFromString(s){
 var t= getCode(s);
 var A = new Array();
 var c = 0;
 var r= s;
 r += "<br>" + t;


 var pos = 0;
while(t.length > 0){
 var a = t.search("_");
 if(a == -1){
  A[c] = new Object();
  A[c].b = pos;
  A[c].e = pos + t.length;
  A[c].w = t; c++;
  break;
 }
 if(a != 0){
  A[c] = new Object();
  A[c].b = pos;
  A[c].e = pos + a;
  A[c].w = t.substr(0,a); c++;
  pos += a;
 } 
 a++; pos++;
 t = t.substr(a, t.length);
}
 t = "";
 for(var  i = 0 ; i < c; i ++){ 
  var st = check(A[i].w,0);
   color = "#00FF00";
  if(st.state == "def"){
   if(st.verify >0) color = "#EE00FF";
   else if(st.verify < 0 ) color = "#FF0000";
  }
  r += "<br><span style=\"color: " + color + ";\">" + getUni(A[i].w) + "(" +A[i].b +"-"+A[i].e + ")" + "</span>";
  r += "(" + st.state + "," +  st.count + "," + st.verify + ")";

 }


 return r;
}

var MoreInfo = 0;
function Info(){
 MoreInfo=(MoreInfo == 1)?0:1;
}
var InfoDesc = new Array();
function getInfo(w){
 InfoDesc[0] = getUni("c1k c6i4yf");
 InfoDesc[1] = getUni("c1k kacq6i6d4yf");
 InfoDesc[2] = getUni("5zi6j kl46d");
 InfoDesc[3] = getUni("kacq6i6dey4yf");
 InfoDesc[4] = getUni("5zi6j");
 InfoDesc[5] = getUni("5zi6j kl46d");
 InfoDesc[6] = getUni("c6ik6dey4yf");
 var st = check(w,0);
 var r = "";
 r += "<br>";
 if(!MoreInfo) r += "<br>";
 r += "<div style=\"border: 1px solid green; width: 40px; \">" + Lang + "</div>";
 color = "#00FF00";
 if(st.state == "def"){
  if(st.verify >0) color = "#EE00FF";
  else if(st.verify < 0 ) color = "#FF0000";
 }
 r += "<span style=\"color: " + color + ";\">" + getUni(w) + "</span>";
 if(st.state =='def'){
  if(MoreInfo){
   r += "<br>" + getUni("c6ik6d4yf");
   r += "<br>" + st.count + " " + InfoDesc[0];
  }
  if(st.verify != 0){
   if(MoreInfo){
     r += "<br>" + ((st.verify>0)?st.verify:(-st.verify)) + " " + InfoDesc[1];
   }
   if(st.verify>0) r += "<br>" + getUni("5zi6j");
   else r += "<br>" + InfoDesc[2];
  }else{
   r += "<br>" + " " + InfoDesc[3];
  }
    
  r += "<table><tr><td>";
  r += "<div class=btn id=r";
  r += " onclick=\"check('" + w + "', '1'); processing('" + w + "');\"";
  r += ">"
  r += InfoDesc[4];
  r += "</div>";

  r += "</td><td>";

  r += "<div class=btn id=f";
  r += " onclick=\"check('" + w + "', '-1'); processing('" + w + "');\"";
  r += ">"
  r += InfoDesc[5];
  r += "</div>";
  r += "</td></tr></table>";
    
 }else{
  r += "<br>" + InfoDesc[6];
 }

 return r;
}

function processing(w){
  var st = check(w,0);
  if(st.state != 'def') add(w);




  var r = getInfo(w);
  $('div#info').html("<center>" + r + "</center>");
  $('div#info').show();


 $("div.btn")
 .mouseover(function(){
  $(this).css("background", "#FFFF00");
 })
 .mouseout(function(){
  $(this).css("background", "#EEEE00");
 });  

  var w = $("textarea")[0].value;
  f = getCode(w);
  $("div")[0].innerHTML = anaLyze(w);



  return r;


}

function getSpanArray(s){
  var st = check(s.w,0);
 var r = "";
   color = "#00FF00";
  if(st.state == "def"){
   if(st.verify >0) color = "#EE00FF";
   else if(st.verify < 0 ) color = "#FF0000";
  }
  r += "<br><span style=\"color: " + color + ";\">" + getUni(s.w) + "</span>";
  if(st.state =='def'){
  r += "<br>" + getUni("c6ik6d4yf");
  r += "<br>" + st.count + " " + getUni("c1k")+" "+getUni("c6i4yf");
   if(st.verify != 0){
    r += "<br>" + ((st.verify>0)?st.verify:(-st.verify)) + " " + getUni("c1k")+" " + getUni("kacq6i6d4yf");
    if(st.verify>0) r += "<br>" + getUni("5zi6j");
    else r += "<br>" + getUni("5zi6j") + " " + getUni("kl46d");
   }
   else r += "<br>" + " " + getUni("kacq6i6dey4yf");
   }
  else r += "<br>" + getUni("c6ik6dey4yf");
  return r;
}

var FocusedLink = -1;

function getSpanCheck(s, id){
  var st = check(s.w,0);
 var r = "";
   color = "#00FF00";
  if(st.state == "def"){
   if(st.verify >0) color = "#EE00FF";
   else if(st.verify < 0 ) color = "#FF0000";
  }
  r += "<span";
  r += " id=\"w" + id + "\"";
  if(id == FocusedLink) r += " style=\"color: #00FFFF;\"";
  else r += " style=\"color: " + color + ";\"";
  r += " onclick=\"processing('" + s.w + "');\"";
  r += ">";
  r += getUni(s.w);
  r += "</span>";
  return r;
}




var Founded = new Object();
Founded.Array = new Array();
Founded.count = 0;

function addToFounded(L){
 var i;
 for(i = 0; i < Founded.count; i++){
  if(Founded.Array[i].w == L.w){
   var ln = Founded.Array[i].lc;
   Founded.Array[i].links[ln] = new Object();
   Founded.Array[i].links[ln].b = L.b;
   Founded.Array[i].links[ln].e = L.e;
   Founded.Array[i].lc++;
   return i;
  }
 }
 i = Founded.count;
 Founded.Array[i] = new Object();
 Founded.Array[i].w = L.w;
 Founded.Array[i].links = new Array();
 Founded.Array[i].links[0] = new Object();
 Founded.Array[i].links[0].b = L.b;
 Founded.Array[i].links[0].e = L.e;
 Founded.Array[i].lc = 1;
 Founded.count++;
 return i;
}

function anaLyze(s){
Founded.count = 0
 var t= getCode(s);
 var pos = 0;
 var r = "";

while(t.length > 0){
 var a = t.search("_");
 if(a == -1){
  var L = new Object();
  L.b = pos; L.e = pos + t.length; L.w = t;
  var link = addToFounded(L);
  r += getSpanCheck(L,link);
  break;
 }else if(a != 0){
  var L = new Object();
  L.b = pos; L.e = pos + a; L.w = t.substr(0,a);
  var link = addToFounded(L);
  r += getSpanCheck(L,link);
  pos += a;
 }
 var l=s.substr(pos,1);
 if(l == " ") r += " ";
 else if(l == '\n') r += "<br>";
 else r+= l;
 a++; pos++;
 t = t.substr(a, t.length);
}
 return r;
}


function save(){
 var t = getDictionary('D');
 var obj = document.createElement('a');
 obj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(t));
 obj.setAttribute('download', 'TT.dict');
 obj.click();
}

function removeDup(){
 for(var i = 0; i < WordsArray.length; i++){
  var w = WordsArray[i];
  if(w == "") continue;
  for(var j = i + 1; j < WordsArray.length; j++){
   if(WordsArray[j] == w) WordsArray[j] = "";
  }
 }
}

function checkDeleted(){
 for(var i = 0; i < DeletedWordsArray.length; i++){
  var w = DeletedWordsArray[i];
  if(w == "") continue;
  var d = check(w, 0);
  if(d.verify >= 0) DeletedWordsArray[i] = "";
 }
}

function AddArray(WA,m){
 var t = "";
 for(var i = 0; i < WA.length; i++){
  var w = WA[i];
  if(w == "") continue;
  var d = check(w, 0);
  if(m == 'D'){
   if(i != 0) t += "\n";
   t += "D({'c':'"
   t += w;
   t += "','e':'";
   t += d.verify;
   t += "','f':'";
   t += eval(d.count);
   t += "'});"
  }else{
   if(i != 0) t += " ";
   t += w;
  }
 }
 return t;
}

function getDictionary(m){
 var t = "";
 t += "L('" + Lang + "');";
 t += getAlphabet();
 removeDup();
 t += AddArray(WordsArray,m);
 checkDeleted()
 t += AddArray(DeletedWordsArray,m);
 return t;
}

function S(s){
 Alphabet[Alphabet.length] = s;
}
function getAlphabet(){
 var t = "";
 for(var i = 0; i < Alphabet.length; i++){
  if(i!=0) t+="\n";
  t += "S({'u':'";
  t += Alphabet[i].u;
  t += "','l':'";
  t += Alphabet[i].l;
  t += "','f':'";
  t += Alphabet[i].f;
  t += "','c':'";
  t += Alphabet[i].c;
  t += "'});";
 }
 t += "genAlphabet();";
 t += "\n";
 return t; 
}


MMM = 455701;
SpS = 54631;

function getT(){
 return (new Date() - 1) % MMM;
}

var rn = getT();

function T(){
 rn = (rn * SpS) % MMM;
}

function GetRand(){
 var ii = rn % WordsArray.length; T();
 www = WordsArray[ii];
 r = getInfo(www);
 $('div#info').html("<center>" + r + "</center>");
 $('div#info').show();
}


var CurPage = -1;
var PageSize = 50;
function GetPage(dr){
 var t = "";
 CurPage += dr;
 if( (CurPage * PageSize >= WordsArray.length) || (CurPage * PageSize < 0) ){
  CurPage -= dr; return;
 }
 var indd = CurPage * PageSize;
 for(var i = 0; i < PageSize && indd < WordsArray.length; i++){
  t += getUni(WordsArray[indd]) + " ";
  indd ++;
 }

  $("textarea")[0].value = t;

  tt();

}


function NewDict(){
 Dict = new Object();
 WordsArray = new Array();
 alert("new!");

}