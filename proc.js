// 9:19 02.05.2020 15+15+15+15+15+15+15


/*
1. Upper-lower case importance
2. Genwords
3. get near
*/
function new_d(){
 var v = new Object();
 v.define = function(){this.innerHTML = "<div style=\"width: " + this.w + "px; height: " + this.h + "px; background: " + this.c + "\"></div>";};
 v.set = function(h,w,c){this.h=h;this.w=w;this.c=c;this.define();}
 return v
}

var Lang = "";
var Langs = new Array();
function L(lang){
 Lang = lang;
 if(!Langs[Lang]){
  Langs[Lang] = new Object();
  Langs[Lang].Alphabet = new Array(); 
  Langs[Lang].Dict = new Object();
  Langs[Lang].WordsArray = new Array();
  Langs[Lang].DeletedWordsArray = new Array();
  Langs[Lang].FoundedWordsArray = new Array();
  Langs[Lang].InfoDesc = new Array();
  Langs[Lang].uString = "";
  Langs[Lang].lString = "";
  Langs[Lang].cString = "";
  Langs[Lang].changed = 0;
 }
 console.log("Language: " + Lang);
} 


function addToWordsArray(c){
 var p = Langs[Lang].WordsArray.length;
 Langs[Lang].WordsArray[p] = c;
 return p;
}

function addToFoundedArray(c){
 var p = Langs[Lang].FoundedWordsArray.length;
 Langs[Lang].FoundedWordsArray[p] = c;
 return p;
}

function isInDeletedWordsArray(c){
 var e = -1;
 for(var i = 0; i < Langs[Lang].DeletedWordsArray.length; i++){
  if(Langs[Lang].DeletedWordsArray[i] == c){
   e = c;
   break;
  }
 }
 return e;
}

function addToDeletedWordsArray(c){
 var p = isInDeletedWordsArray(c); 
 if(isInDeletedWordsArray(c) != -1) return p;
 var p = Langs[Lang].DeletedWordsArray.length;
 Langs[Lang].DeletedWordsArray[p] = c;
 return p;
}

function show(ind){
 alert(JSON.stringify(check(ind,0)) + "\n\n" + JSON.stringify(cur));
}

function add(ind){
 var d =new Object();
 d.name= ind;
 Langs[Lang].changed=1;
 cur = Langs[Lang].Dict;
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
 }
 return d;
}

function check(ind, value){
 var d =new Object();
 d.name= ind;
 if(value != 0){
  Langs[Lang].changed = 1;
 }
 cur = Langs[Lang].Dict;
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
   Langs[Lang].WordsArray[cur.pos] = "";
  } else if(Langs[Lang].WordsArray[cur.pos] == ""){
   Langs[Lang].WordsArray[cur.pos] = ind; // revert 
  }
 } else d.state="found";
 return d;
}

function D(Word, Case=0){
 ind = Word.c;
 var d =new Object();
 d.name= ind;
 cur = Langs[Lang].Dict;
 for(var i =0; i < ind.length; i++){
  var ic = ind.substr(i,1);
  if(cur[ic])cur=cur[ic];
  else{ cur[ic] = new Object(); cur=cur[ic];}
 }
 if(!cur) cur = new Object();
 if((cur.count != undefined) && (cur.verify != undefined)){
  cur.count = 0 + eval(cur.count) + eval(Word.f);
  d.state="def";d.count=cur.count;d.verify=cur.verify;}
 else {
  cur.count = Word.f; cur.verify = Word.e;
  if(Word.e >= 0) cur.pos = addToWordsArray(Word.c);
  else addToDeletedWordsArray(Word.c) // loaded nonverified to deleted 
  d.state="add";d.count=cur.count;d.verify=cur.verify;
 }
 return d;
}


function genAlphabet(){
 Langs[Lang].uString=""; Langs[Lang].lString=""; Langs[Lang].cString="";
 var f;
 for(var i = 0; i < Langs[Lang].Alphabet.length;i++){
  v="f = \"\\u" + Langs[Lang].Alphabet[i].l+ "\";";
  eval(v);
  Langs[Lang].Alphabet[i].lLetter = f;
  Langs[Lang].lString += f;

  v="f = \"\\u" + Langs[Lang].Alphabet[i].u+ "\";";
  eval(v);
  Langs[Lang].Alphabet[i].uLetter = f;
  Langs[Lang].uString += f;

  Langs[Lang].cString += Langs[Lang].Alphabet[i].c;
 }
}

function get_u(c){
 var t = "";
 for(var i = 0; i < c.length; i++){
  var n = c.substr(i,1);
  for(var j = 0; j < Langs[Lang].Alphabet.length; j++){
   if(n == Langs[Lang].Alphabet[j].c){ t+= Langs[Lang].Alphabet[j].Lletter; break;}
  }
 }
 alert(t);
}

function isRegExp(s){
 if(s == "?") return 1;
 if(s == "+") return 1;
 if(s == "(") return 1;
 if(s == ")") return 1;
 if(s == "[") return 1;
 if(s == "]") return 1;
 if(s == "|") return 1;
 if(s == "\\") return 1;
 if(s == "/") return 1;
 if(s == "^") return 1;
 if(s == "*") return 1;
 return 0;
}

function getCode(f){
v="";
for(var i=0;i< f.length;i++){
 var s = f.substr(i,1);
 var pos;
 if(isRegExp(s) == 1) pos = -1;
 else pos = Langs[Lang].lString.search(s);
 if(f.substr(i,1) == '.') v+="_";
 else if(pos != -1) v += Langs[Lang].cString.substr(pos,1);
 else{
  var pos;
 if(isRegExp(s) == 1) pos = -1;
  else pos = Langs[Lang].uString.search(s);
  if(pos != -1) v += Langs[Lang].cString.substr(pos,1);
  else v += "_";
 }
}
return v;
}
function getUni(f){
var v = "";
for(var i=0;i< f.length;i++){
 var z = f.substr(i,1);
 var pos = Langs[Lang].cString.search(z);
 if(pos != -1)
  v += Langs[Lang].lString.substr(pos,1);
 else if (z == "_") v += " ";
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

function I(W,c){
 Langs[Lang].InfoDesc[c] = getUni(W);
}

function SaveInterface(){
 var t = "";
 for(var i = 0; i < Langs[Lang].InfoDesc.length; i++){
  t += "I(\"";
  t += getCode(Langs[Lang].InfoDesc[i]);
  t += "\",";
  t += i;
  t += ");"
 }
 return t;
}



var MoreInfo = 0;
function Info(){
 MoreInfo=(MoreInfo == 1)?0:1;
}

function getInfo(l,w, h){
 var st = check(w,0);
 var r = "";
 r += "<div style='position: relative; width: 190px; text-align: right;' onclick='removeInfo();'>X</div>";
// if(!MoreInfo) r += "<br>";
 r += "<div style=\"border: 1px solid green; width: 40px; \">" + l + "</div>";
 color = "#009900";
 if(st.state == "def"){
  if(st.verify >0) color = "#880099";
  else if(st.verify < 0 ) color = "#990000";
 }
 r += "<span style=\"font-size: 28px; color: " + color + ";\">" + getUni(w) + "</span>";
 if(st.state =='def'){
  if(MoreInfo){
   r += "<br>" + Langs[l].InfoDesc[7];
   r += "<br>" + st.count + " " + Langs[l].InfoDesc[0];
  }
  if(st.verify != 0){
   if(MoreInfo){
     r += "<br>" + ((st.verify>0)?st.verify:(-st.verify)) + " " + Langs[l].InfoDesc[1];
   }
   if(st.verify>0) r += "<br>" + Langs[l].InfoDesc[4];
   else r += "<br>" + Langs[l].InfoDesc[2];
  }else{
   r += "<br>" + " " + Langs[l].InfoDesc[3];
  }
    
  r += "<table><tr><td>";
  r += "<div class=btn id=r";
  r += " onclick=\"check('" + w + "', '1'); processing('"+l+"','" + w + "'," + h + ");";
  if(h) r += "removeInfo();";
  else r += "GetRand();";
  r += "\">"
  r += Langs[l].InfoDesc[4];
  r += "</div>";

  r += "</td><td>";

  r += "<div class=btn id=f";
  r += " onclick=\"check('" + w + "', '-1'); processing('"+l+"','" + w + "'," + h + ");";
  if(h) r += "removeInfo();";
  else r += "GetRand();";
  r += "\">"
  r += Langs[l].InfoDesc[5];
  r += "</div>";
  r += "</td></tr></table>";
    
 }else{
  r += "<br>" + Langs[l].InfoDesc[6];
 }

 return r;
}


function removeInfo(){
 $('div#info').hide();

}

function processing(l,w,h){
  L(l);
  var st = check(w,0);
  if(st.state != 'def') add(w);




  var r = getInfo(l,w,h);
  $('div#info').html("<center>" + r + "</center>");
  $('div#info').show();

 if(Lang == 'TT'){
  $("div.btn")
  .mouseover(function(){
   $(this).css("background", "#FFFF00");
  })
  .mouseout(function(){
   $(this).css("background", "#EEEE00");
  }).css("background", "#EEEE00");  
  $('div#info').css("background", "#FFFF00");
 }
 if(Lang == 'RU'){
  $("div.btn")
  .mouseover(function(){
   $(this).css("background", "#00FFFF");
  })
  .mouseout(function(){
   $(this).css("background", "#00EEEE");
  }).css("background", "#00EEEE");  
  $('div#info').css("background", "#00FFFF");
 }

//  var w = $("textarea")[0].value;
//  var w = $("#txt_"+Lang)[0].value;
  var w = document.getElementById("txt_"+Lang).value;
  f = getCode(w);

  $("#uni_"+Lang)[0].innerHTML = anaLyze(w,Lang);



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
   color = "#009900";
  if(st.state == "def"){
   if(st.verify >0) color = "#880099";
   else if(st.verify < 0 ) color = "#990000";
  }
  r += "<span";
  r += " id=\"w" + id + "\"";
  if(id == FocusedLink) r += " style=\"color: #009999;\"";
  else r += " style=\"color: " + color + ";\"";
  r += " onclick=\"processing('"+Lang+"','" + s.w + "',1);\"";
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


var busy = 0;

function anaLyze(s,l){
if( busy == 1){
 setTimeout("anaLyze('"+s+"','"+l+"');",100);
 return;
}
busy = 1;
L(l);
Founded.count = 0
 var t= getCode(s);
 var pos = 0;
 var r = "";
while(t.length > 0){
 var a = t.search("_");
 if(a == -1){
  var aL = new Object();
//  aL.b = pos; aL.e = pos + t.length;
  aL.w = t;
  var link = addToFounded(aL);
  r += getSpanCheck(aL,link);
  break;
 }else if(a != 0){
  var aL = new Object();
//  aL.b = pos; aL.e = pos + a;
  aL.w = t.substr(0,a);
  var link = addToFounded(aL);
  r += getSpanCheck(aL,link);
  pos += a;
 }
 var l=s.substr(pos,1);
 if(l == " ") r += " ";
 else if(l == '\n') r += "<br>";
 else r+= l;
 a++; pos++;
 t = t.substr(a, t.length);
}
 busy = 0;
 return r;
}

function addAll(){
 var s = document.getElementById('txt_'+Lang).value;
 var t= getCode(s);
 var pos = 0;
 var w;
 while(t.length > 0){
  var a = t.search("_");
  if(a == -1){
   w = t;
   console.log("a == -1 -> " + w);
   var st = check(w,0).state;
   if(st != 'def') add(w);
   break;
  }else if(a != 0){
   w = t.substr(0,a)
   console.log("a != 0 -> " + w);
   var st = check(w,0).state;
   if(st != 'def') add(w);
   pos += a;
  }
  var l=s.substr(pos,1);
  a++; pos++;
  t = t.substr(a, t.length);
 }
}

function save(){
 for(l in Langs){
  Lang = l;
  if(Langs[Lang].changed == 0) continue;
  var t = getDictionary('D');
  var obj = document.createElement('a');
  obj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(t));
  obj.setAttribute('download', Lang + '.dict');
  obj.click();
  Langs[Lang].changed = 0;
 }
}

function removeDup(){
 for(var i = 0; i < Langs[Lang].WordsArray.length; i++){
  var w = Langs[Lang].WordsArray[i];
  if(w == "") continue;
  for(var j = i + 1; j < Langs[Lang].WordsArray.length; j++){
   if(Langs[Lang].WordsArray[j] == w) Langs[Lang].WordsArray[j] = "";
  }
 }
}

function checkDeleted(){
 for(var i = 0; i < Langs[Lang].DeletedWordsArray.length; i++){
  var w = Langs[Lang].DeletedWordsArray[i];
  if(w == "") continue;
  var d = check(w, 0);
  if(d.verify >= 0) Langs[Lang].DeletedWordsArray[i] = "";
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
 L(Lang);
 t += "L('" + Lang + "');";
 t += getAlphabet();
 removeDup();
 t += AddArray(Langs[Lang].WordsArray,m);
 checkDeleted()
 t += AddArray(Langs[Lang].DeletedWordsArray,m);
 t += SaveInterface();
 return t;
}

function S(s){
 Langs[Lang].Alphabet[Langs[Lang].Alphabet.length] = s;
}
function getAlphabet(){
 var t = "";
 for(var i = 0; i < Langs[Lang].Alphabet.length; i++){
  if(i!=0) t+="\n";
  t += "S({'u':'";
  t += Langs[Lang].Alphabet[i].u;
  t += "','l':'";
  t += Langs[Lang].Alphabet[i].l;
  t += "','f':'";
  t += Langs[Lang].Alphabet[i].f;
  t += "','c':'";
  t += Langs[Lang].Alphabet[i].c;
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
 var y;
 count = 10;
 do{
  var ii = rn % Langs[Lang].WordsArray.length; T();
  var y = check(Langs[Lang].WordsArray[ii],0).verify;
  count --; if(count < 0) return;
 }while(y != 0);
 r = getInfo(Lang,Langs[Lang].WordsArray[ii],0);
 $('div#info').html("<center>" + r + "</center>");
 $('div#info').show();
}


var CurPage = -1;
var PageSize = 50;
function GetPage(dr){
 var t = "";
 CurPage += dr;
 if( (CurPage * PageSize >= Langs[Lang].WordsArray.length) || (CurPage * PageSize < 0) ){
  CurPage -= dr; return;
 }
 var indd = CurPage * PageSize;
 for(var i = 0; i < PageSize && indd < Langs[Lang].WordsArray.length; i++){
  t += getUni(Langs[Lang].WordsArray[indd]) + " ";
  indd ++;
 }

  $("#txt_"+Lang)[0].value = t;

  Change(Lang);

}


function NewDict(){
 Langs[Lang].Dict = new Object();
 Langs[Lang].WordsArray = new Array();
 alert("new!");

}