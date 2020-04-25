function get_hex_dig(d){
 var dig = "";
 if(d < 10) dig = d;
 else if(d == 10) dig = "A";
 else if(d == 11) dig = "B";
 else if(d == 12) dig = "C";
 else if(d == 13) dig = "D";
 else if(d == 14) dig = "E";
 else if(d == 15) dig = "F";
 else dig = "<undefined>";
 return dig;
}

function get_hex(n){
 var val;
 var hex = "";
 val = n;
 dim = val % (16 * 16 * 16)
 dig = ((val - dim) / (16 * 16 * 16));
 hex += get_hex_dig(dig);

 val = dim
 dim = val % (16 * 16)
 dig = ((val - dim) / (16 * 16));
 hex += get_hex_dig(dig);

 val = dim;
 dim = val % (16)
 dig = ((val - dim) / (16));
 hex += get_hex_dig(dig);

 val = dim;
 dig = val;
 hex += get_hex_dig(dig);
 return hex;
}

function remove_script(id){
 var obj = document.getElementById(id);
 if(obj) obj.parentNode.removeChild(obj);
}

function print_sym(u, text){
 if(u == '') return text;
 var obj = document.getElementById('text_prsy');
 if(!obj) return text;
 obj.innerHTML = text;
 var obj = document.createElement('script');
 if(!obj) return text;
 var stext = "";
 var call = Math.random().toString().replace(/\./g,"");
 stext += "function insert_" + u + "_" + call + "(){\n";
 stext += " var obj = document.getElementById('" + "text_prsy" + "');\n";
 stext += " if(!obj){ return ; }\n";
 stext += " var text = obj.innerHTML;\n";
 stext += " text += \"\\u" + u + "\";\n";
 stext += " obj.innerHTML = text;\n";
 stext += "}\n";
 stext += "insert_" + u + "_" + call + "();";
 obj.text = stext;
 obj.id = 'script_' + u + "_" + call;
 var head = document.getElementsByTagName('head')[0];
 head.appendChild(obj);
 obj = document.getElementById('text_prsy');
 if(!obj) return text;
 var new_text;
 new_text = obj.innerHTML;
 setTimeout("remove_script('script_" + u + "_" + call + "');", 100);
 return new_text;
}


function print_word(w, text){
 var u = w.substring(0, 4);
 var wl = w.substr(4, w.length);
 new_text = print_sym(u, text);
 if(wl != "") new_text = print_word(wl, new_text);
 return new_text;
}

var keywords;

function get_stamp(obj){
 if(obj.type == 'latin') return obj.print;
 if(obj.type == 'unicode') return print_word(obj.print, '');
 return '';
}

function writeu(a){
 if(items('typing word by mouse click') != 'enable') return;
 obj = document.getElementById('text');
 if(!obj) return;
 text = obj.innerHTML;
 if(text == get_stamp(keywords.write)){
  obj = document.getElementById('text_d');
  if(!obj) return;
  obj.innerHTML = "<div id=text style=\"color: green; border: green 1px solid;\" onclick=\"write_word();\"></div>";
  obj = document.getElementById('new_d');
  if(obj){
   text = "";
   text += "<div id=add style=\"background: #ad1; border: yellow 1px solid; color: blue;\" ";
   text += "onmouseover=\"this.style.color='#0af';\" ";
   text += "onmouseout=\"this.style.color='blue';\" ";
   text += "onclick=\"refresh();\">" + get_stamp(keywords.new) + "</div>";
   obj.innerHTML = text;
  }
  writeu(a); return;
 }
 text = print_sym(a, text);
 obj = document.getElementById('text');
 obj.innerHTML = text;
 var match = 'no';
 for(var i = 0; i < N; i++){
  if(text == word[i]){ match = 'yes'; break; }
 }
 obj = document.getElementById('match_d');
 if(obj){
  if(match == 'yes') obj.innerHTML = get_stamp(keywords.known);
  if(match == 'no') obj.innerHTML = get_stamp(keywords.unknown);
 }
 obj = document.getElementById('add_d');
 if(obj){
  if(match == 'no'){
   text = "";
   text += "<div id=add style=\"background: #ad1; border: red 1px solid; color: blue;\" ";
   text += "onmouseover=\"this.style.color='#0af';\" ";
   text += "onmouseout=\"this.style.color='blue';\" ";
   text += "onclick=\"insert();\">" + get_stamp(keywords.insert) + "</div>";
   obj.innerHTML = text;
  }
  if(match == 'yes') obj.innerHTML = "";
 }
 obj = document.getElementById('code');
 if(obj){
  var l = print_sym(a, '')[6]
  if(l >= 'À' && l <= 'ÿ')  obj.innerHTML += l;
  else obj.innerHTML += "" + a;
 }
}

function refresh(){
 var obj = document.getElementById('text_d');
 if(obj){
  var text = "";
  text += "<div id=text onclick=\"write_word();\" ";
  text += "style=\"border: green 1px solid; color: green;\">";
  text += get_stamp(keywords.write);
  text += "</div>";
  obj.innerHTML = text;
 }
 var obj = document.getElementById('code');
 if(obj) obj.innerHTML = "";
 var obj = document.getElementById('match_d');
 if(obj) obj.innerHTML = "";
 var obj = document.getElementById('add_d');
 if(obj) obj.innerHTML = "";
 var obj = document.getElementById('new_d');
 if(obj) obj.innerHTML = "";
}


function insert(){
 if(items('add word to dictionary') != 'enable') return;
 var obj = document.getElementById('text');
 if(!obj) return;
 var text = obj.innerHTML;
 word[N] = text;

 obj = document.getElementById('add_d');
 if(obj) obj.innerHTML = "";
 obj = document.getElementById('match_d');
 if(obj) obj.innerHTML = get_stamp(keywords.known);

 var obj = document.getElementById('code');
 if(!obj) return;
 var text = obj.innerHTML;

 if(sorted == 'false') asort();

 coding[N] = text;
 indx = gen_ind(text);
 index[N] = indx;
 len = text.length;
 word[N] = print_word(text, '');
 frequency[N] = 1;
 verify[N] = 'no';
 alphabetic_order[M] = N;
 N++; M++;

 l = sorted;
 sorted = 'false'; 

 for(i = M - 1; i > 0; i--){ // 1
  if(eval(indx) < eval(index[alphabetic_order[i - 1]])){ // 2
   tmp = alphabetic_order[i];
   alphabetic_order[i] = alphabetic_order[i - 1];
   alphabetic_order[i - 1] = tmp;
  }else if (eval(indx) == eval(index[alphabetic_order[i - 1]])){ // 2
   iu = gen_ind(text.substring(glen * 4, len));
   leni = (coding[alphabetic_order[i - 1]]).length;
   id = gen_ind((coding[alphabetic_order[i - 1]]).substring(glen * 4, leni));
   if(iu < id){ // 3
    tmp = alphabetic_order[i];
    alphabetic_order[i] = alphabetic_order[i - 1];
    alphabetic_order[i - 1] = tmp;
   }else break; // 3
  }else break; // 2
 } // 1
 sorted = l;

 refresh();
}

function set_all(){
 var s = new Array();
 s[0] = new Array(0x04D8, 0x04D9);
 s[1] = new Array(0x04E8, 0x04E9);
 s[2] = new Array(0x04AE, 0x04AF);
 s[3] = new Array(0x0496, 0x0497);
 s[4] = new Array(0x04A2, 0x04A3);
 s[5] = new Array(0x04BA, 0x04BB);
 var obj = document.createElement('script');
 if(!obj) return;
 text = "function get_all(id){\n var obj = document.getElementById(id);\n if(!obj) return;\n var text=\"\";\n ";
 var code;
 c = 0; p = 13;
 for(var i = 0x0430; i <= 0x044F; i++){
  a = i;
  code = get_hex(a); c++;
  text += "text += \"<span id=" + code + " title=\\\"" + code + "\\\" onclick=\\\"writeu('" + code + "');\\\">\\u" + code + " </span>\";\n ";
  if(c % p == p - 1) text += "text += \"<br>\";\n ";
 }

 for(i = 0; i < 6; i++){
  a = s[i][1];
  code = get_hex(a); c++;
   text += "text += \"<span id=" + code + " title=\\\"" + code + "\\\" onclick=\\\"writeu('" + code + "');\\\">\\u" + code + " </span>\";\n ";
  if(c % p == p - 1) text += "text += \"<br>\";\n ";
 }
 text += "obj.innerHTML = text;\n}";
 obj.text = text;
 obj.id = "uni";
 var head = document.getElementsByTagName('head')[0];
 head.appendChild(obj);
}

function pin_all(id){
 var obj = document.getElementById('uni');
 if(!obj){ setTimeout("uni_all('" + id + "');", 100); return; }
 var obj = document.getElementById(id);
 if(!obj) return;
 get_all(id);
}

function butt(n){
 var buts = new Array();
 var keys = settings.keywords.menu;
 var but_c = new Array();
 var fun = new Array();
 var isb = new Array();
 var tit = new Array();
 if(items('check word') == 'enable'){
  buts[0] = document.getElementById('word_b');
  if(!buts[0]) return;
  but_c[0] = get_stamp(keys.word);
  fun[0] = "wor();";
  tit[0] = get_stamp(keys.word_title);
  isb[0] = 'yes';
 }else isb[0] = 'no';
 if(items('typing and check words of text') == 'enable'){
  buts[1] = document.getElementById('tex_b');
  if(!buts[1]) return;
  but_c[1] = get_stamp(keys.text);
  fun[1] = "tex();";
  tit[1] = get_stamp(keys.text_title);
  isb[1] = 'yes';
 }else isb[1] = 'no';
 if(items('view dictionary') == 'enable'){
  buts[2] = document.getElementById('dic_b');
  if(!buts[2]) return;
  but_c[2] = get_stamp(keys.dictionary);
  fun[2] = "asort(); compa(); dic();";
  tit[2] = get_stamp(keys.dictionary_title);
  isb[2] = 'yes';
 }else isb[2] = 'no';
 if(items('orphographic analysis of the words of dictionary') == 'enable'){
  buts[3] = document.getElementById('lex_b');
  if(!buts[3]) return;
  but_c[3] = get_stamp(keys.orphography);
  fun[3] = "lex();";
  tit[3] = get_stamp(keys.orphography_title);
  isb[3] = 'yes';
 }else isb[3] = 'no';
 var clicked = "<div style=\"background: #ccc; color: #555;\">";
 var nonclicked = "<div style=\"background: #ccc; color: white;\" onmouseover=\"this.style.color='red';\" onmouseout=\"this.style.color='white';\" ";
// var but_c = new Array("044104AF0437", "04420435043A04410442", "044104AF0437043B0435043A", "043E04400444043E04330440043004440438044F"); //"043B0435043A04410438043A0430");
// var but_c = new Array(get_stamp(keys.word), get_stamp(keys.text), get_stamp(keys.dictionary), get_stamp(keys.orphography)); //"043B0435043A04410438043A0430");
// var fun = new Array("wor();", "tex();", "asort(); compa(); dic();", "lex();");
// var tit = new Array("click to check a word", "click to check a text", "click to view the dictionary", "lexical analysis");
// var tit = new Array(get_stamp(keys.word_title), get_stamp(keys.text_title), get_stamp(keys.dictionary_title), get_stamp(keys.orphography_title));
 for(i = 0; i < 4; i++){
  if(isb[i] == 'yes'){
   if(i == n) buts[i].innerHTML =  clicked + but_c[i] + "</div>"
   else buts[i].innerHTML = nonclicked + "title =\"" + tit[i] + "\" onclick=\"" + fun[i] + "\">" + but_c[i] + "</div>"
  }
 }
} 

// b 21:21 14.11.2016
function Chf(a){
 var chfarr = new Array(
 {'i': '0123456789', 'c' : '10'},
 {'i': 'abcdefghijklmnopqrstuvqxyz', 'c' : '26'},
 {'i': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'c' : '26'}
);
 var v = "*";
 var arange = a;
 for(var i = 0; i < chfarr.length; i++){
  if(arange < eval(chfarr[i].c)){ v = chfarr[i].i.substr(arange,1); break;}
  arange -= eval(chfarr[i].c);
 }
 return v;
}
// e 21:21 14.11.2016
// b 21:40 14.11.2016
function verCount(v){
 if( v.substr(0,1) == 'y') return 1;
 else return 0;
}
// e 21:41 14.11.2016
// b 21:49 14.11.2016
function getCHfOfHex(hex){
 var ch = "";
 var j = 0;
 for(var i = 0; i < Pcount; i++){
  if(get_hex(Parsers[i]) == hex){
   j += i;
   ch = Chf(j);
   return ch; 
  }
 }
 j = Pcount;
 for(var i = 0; i < Acount; i++){
  if(get_hex(Alphabet[i][1]) == hex){
   j += i;
   ch = Chf(j);
   return ch; 
  }
 }
 return ch; 
}
function getCHfOfHword(Hword){
 var ch = "";
 c = Hword;
 while(c.length >= 4){
  hex = c.substr(0,4);

  l = c.length;
  t = c.substr(4, l - 4);
  c = t;
  ch += getCHfOfHex(hex);
 }
 return ch; 
}
// e 21:49 14.11.2016
// b 19:43 14.11.2016
function getDictCode(m){
 var code = "";
if(m == 0){ // i 19:48 14.11.2016
 code += "/*\n";
 code += " This dictionary created by " + properties.product /*Tartar Orchid*/ + " (c) version " + properties.version + ".\n";
 code += " Author: " + properties.license_to + ".\n";
 code += " All rights protected by laws of Russian Federation. 2014.\n";
 code += "*/\n";
 code += "var folder = \"" + folder + "\";\n";
 code += "var pre = \"" + pre + "\";\n";
 code += "var N = " + M + ";\n";
 code += "var word = new Array();\n";
 code += "var verify = new Array();\n";
 code += "var index = new Array();\n";
 code += "var frequency = new Array();\n";
 for(i = 0; i < M; i++){
  code += "word[" + i + "] = \"" + coding[alphabetic_order[i]] + "\";\n";
  code += "verify[" + i + "] = \"" + verify[alphabetic_order[i]] + "\";\n";
  code += "index[" + i + "] = \"" + index[alphabetic_order[i]] + "\";\n";
  code += "frequency[" + i + "] = " + frequency[alphabetic_order[i]] + ";\n";
 }
 code += "var sorted = \"" + sorted + "\";\n";
 code += "var Acount = " + Acount + ";\n";
 code += "var Alphabet = new Array();\n";
 for(i = 0; i < Acount; i++){
  code += "Alphabet[" + i + "] = new Array(0x" + get_hex(Alphabet[i][0]) + ", 0x" + get_hex(Alphabet[i][1]) + ");\n";
 }
 code += "var alphabet_freq = new Array(";
 for(i = 0; i < Acount; i++){
  if( i != 0) code += ", ";
  code += alphabet_freq[i];
 }
 code += ");\n";
 code += "var alphabet_sort = new Array(";
 for(i = 0; i < Acount; i++){
  if( i != 0) code += ", ";
  code += alphabet_sort[i];
 }
 code += ");\n";
 code += "var Pcount = " + Pcount + ";\n";
 code += "var Parsers = new Array();\n";
 for(i = 0; i < Pcount; i++){
  code += "Parsers[" + i + "] = ";
  code += "0x" + get_hex(Parsers[i]);
  code += ";\n";
 }
}else{ // i 19:48 14.11.2016
// c b 19:52 14.11.2016
 code += "/*\n";
 code += " This dictionary created by " + properties.product /*Tartar Orchid*/ + " (c) version " + properties.version + ".\n";
 code += " Author: " + properties.license_to + ".\n";
 code += " All rights protected. 2016.\n";
 code += "*/\n";
 code += "var folder = \"" + folder + "\";\n";
 code += "var pre = \"" + pre + "\";\n";
 code += "var N = " + M + ";\n";
// m b 19:53 14.11.2016
 code += "var word = new Array(\n";
// i b 22:22 14.11.2016
for(var j = 0; j < Pcount; j++){
 code += "/" + "/" + " " + Chf(j) + " is parser\n";
}
// i e 22:22 14.11.2016

 for(var i = 0; i < M; i++){
  code += "{";
//  code += " 'w': '" + coding[alphabetic_order[i]] + "'"; // s m 21:59 14.11.2016
//  code += ",";
  code += " 'c': '" + getCHfOfHword(coding[alphabetic_order[i]]) + "'"; // m 21:59 14.11.2016
  code += ",";
//  code += " 'v': '" + verify[alphabetic_order[i]] + "'"; // s m 21:42 14.11.2016
//  code += ",";
  code += " 'e': '" + verCount(verify[alphabetic_order[i]]) + "'"; // m 21:42 14.11.2016
  code += ",";
//  code += " 'i': '" + index[alphabetic_order[i]] + "'";
//  code += ",";
  code += " 'f': '" + frequency[alphabetic_order[i]] + "'";
  code += "}";
  if(i != M - 1) code += ",";
  code += "\n";
 }
 code += ");\n";
// m e 19:53 14.11.2016
 code += "var sorted = \"" + sorted + "\";\n";
 code += "var Acount = " + Acount + ";\n";
// m b 20:12 14.11.2016
 code += "var Alphabet = new Array(\n";

 for(var i = 0; i < Acount; i++){
  code += "{";
  code += " 'u' : '" + get_hex(Alphabet[i][0]) + "'";
  code += ",";
  code += " 'l' : '" + get_hex(Alphabet[i][1]) + "'";
  code += ",";
  code += " 'f' : '" + alphabet_freq[i] + "'";
//  code += ",";
//  code += " 's' : '" + alphabet_sort[i] + "'";
// add b 12:27 15.11.2016
  code += ",";
  code += " 'c' : '" + Chf(i + Pcount) + "'";
// add e 12:28 15.11.2016
  code += "}";
  if(i != Acount-1) code += ",";
  code += "\n";
 }
 code += ");\n";
// m e 20:12 14.11.2016
 code += "var Pcount = " + Pcount + ";\n";
 code += "var Parsers = new Array();\n";
 for(i = 0; i < Pcount; i++){
  code += "Parsers[" + i + "] = ";
  code += "0x" + get_hex(Parsers[i]);
  code += ";\n";
 }
// c e 19:52 14.11.2016
 } // i 19:48 14.11.2016
 return code;
}
// e 19:43 14.11.2016

function dic(){
 keywords = settings.keywords.dictionary;
 var obj = document.getElementById('dic_op');
 if(obj){ op = obj.innerHTML; }
 else{
/*
  obj = document.createElement('div');
  obj.id = 'dic_op';
  obj.hidden = 'true';
  obj.style = 'font-size: 0px;';
  obj.innerHTML = "all";
*/
//  document.getElementsByTagName('body')[0].appendChild(obj);
  document.getElementsByTagName('body')[0].innerHTML += "<div id=dic_op hidden style=\"font-size: 0px;\">all</div>";
  op = 'all';
 }
 var obj = document.getElementById('dic_lit');
 if(obj){ lit = obj.innerHTML; }
 else{
  lit = coding[alphabetic_order[0]].substring(0, 4);
 /*
  obj = document.createElement('div');
  obj.id = 'dic_lit';
  obj.hidden = 'true';
  obj.style = 'font-size: 0px;';
  obj.innerHTML = lit;
*/
//  document.getElementsByTagName('body')[0].appendChild(obj);
  document.getElementsByTagName('body')[0].innerHTML += "<div id=dic_lit hidden style=\"font-size: 0px;\">" + lit + "</div>";
 }

 var obj = document.getElementById('show');
 if(!obj) return;
 var text = "";
 var ci;
 var liter;
 text += "<center><h1>" + get_stamp(keywords.dictionary) + "</h1></center>";

 text += "<center><table cellpadding=10px><tbody><tr><td>";
 if(op == 'all') text += "<div style=\"color: #cc4;\">" + get_stamp(keywords.all_types) + "</div>";
 else text += "<div style=\"color: blue;\" title=\"" + get_stamp(keywords.all_types_title) + "\" onmouseover=\"this.style.color='#cc4';\" onmouseout=\"this.style.color='blue';\" onclick=\"var obj=document.getElementById('dic_op');if(!obj) return; obj.innerHTML='all'; dic();\">" + get_stamp(keywords.all_types) + "</div>";
 text += "</td><td>";
 if(op == 'verified') text += "<div style=\"color: #cc4;\">" + get_stamp(keywords.verified) + "</div>";
 else text += "<div style=\"color: blue;\" title=\"" + get_stamp(keywords.verified_title) + "\" onmouseover=\"this.style.color='#cc4';\" onmouseout=\"this.style.color='blue';\" onclick=\"var obj=document.getElementById('dic_op');if(!obj) return; obj.innerHTML='verified'; dic();\">" + get_stamp(keywords.verified) + "</div>";
 text += "</td><td>";
 if(op == 'check') text += "<div style=\"color: #cc4;\">" + get_stamp(keywords.check) + "</div>";
 else text += "<div style=\"color: blue;\" title=\"" + get_stamp(keywords.check_title) + "\" onmouseover=\"this.style.color='#cc4';\" onmouseout=\"this.style.color='blue';\" onclick=\"var obj=document.getElementById('dic_op');if(!obj) return; obj.innerHTML='check'; dic();\">" + get_stamp(keywords.check) + "</div>";
 text += "</td></tr></tbody></table></center>";

 text += "<center><table cellpadding=10px><tbody><tr>";
 tmp = '';
 var ver_count = 0;
 var ch_count = 0;
 for(i = 0; i < M; i++){ // 1
  liter = coding[alphabetic_order[i]].substring(0, 4);
  var skip = 'no';
  if(verify[alphabetic_order[i]] == 'no'){
   ch_count++;
   if(op == 'verified') skip = 'yes';
  }
  if(verify[alphabetic_order[i]] != 'no'){
   ver_count++;  
   if(op == 'check')skip = 'yes';
  }
  if(liter == tmp || skip == 'yes') {} // 2
  else{ // 2
   text += "<td>";
   if(liter == lit) text += "<div style=\"color: #cc4;\" >" + print_word(lit, '') + "</div>"; // 3
   else{ // 3
    text += "<div style=\"color: blue;\" ";
    text += "onmouseover=\"this.style.color='#cc4';\" onmouseout=\"this.style.color='blue';\" ";
    text += "onclick=\"var obj=document.getElementById('dic_lit');if(!obj) return; obj.innerHTML='" + liter + "'; dic();\">";
    text += print_word(liter, '') + "</div>";
   } // 3
   text += "</td>";
  } // 2
  if(skip == 'no') tmp = liter;
 } // 1
// alert("verify: " + ver_count + "\n" + "check: " + ch_count + "\n" + "total: " + (eval(ver_count) + eval(ch_count)));
 text += "<td>";
 if(lit == get_stamp(keywords.all_alphabet)) text += "<div style=\"color: #cc4;\" >" + get_stamp(keywords.all_alphabet) + "</div>";
 else{
  text += "<div style=\"color: blue;\" ";
  text += "onmouseover=\"this.style.color='#cc4';\" onmouseout=\"this.style.color='blue';\" ";
  text += "onclick=\"var obj=document.getElementById('dic_lit');if(!obj) return; obj.innerHTML='" + get_stamp(keywords.all_alphabet) + "'; dic();\">";
  text += get_stamp(keywords.all_alphabet) + "</div>";
 }
 text += "</td>";
 text += "</tr></tbody></table></center>";

 i = 0;
 liter = coding[alphabetic_order[i]].substring(0, 4);
 if(op == 'verified'){
  do{
   if(lit == get_stamp(keywords.all_alphabet)){ if(verify[alphabetic_order[i]] != 'no') break;}
   else{
    liter = coding[alphabetic_order[i]].substring(0, 4);
    if(verify[alphabetic_order[i]] != 'no' && liter == lit) break;
   }
   i++;
  } while(i < M);
 }else if(op == 'check'){
  do{
   if(lit == get_stamp(keywords.all_alphabet)){ if(verify[alphabetic_order[i]] == 'no') break;}
   else{
    liter = coding[alphabetic_order[i]].substring(0, 4);
    if(verify[alphabetic_order[i]] == 'no' && liter == lit) break;
   }
   i++;
  } while(i < M);
 }else if(op == 'all'){
  do{
   if(lit == get_stamp(keywords.all_alphabet)) break;
   else{
    liter = coding[alphabetic_order[i]].substring(0, 4);
    if(liter == lit) break;
   }
   i++;
  } while(i < M);
 }
 if(i < M){ // 1
  text += "<center><table cellpadding=100 cellspacing=0 border=1><tbody>";
  text += "<tr><td><span style=\"color: #1fa; font-size: 30px;\">" + print_word(liter, '') + "</span></td>";
  text += "<td>";
  text += "<table><tbody>";
  for(; i < M;){ // 2
   ci = coding[alphabetic_order[i]].substr(0, 4);
   if(ci == liter){ // 3
    text += "<tr><td>";
    if(verify[alphabetic_order[i]] == "no"){ // 4
     text += "<div id=c" + i + ">";
     text += "<table cellspacing=0 cellpadding=0><tbody><tr>";
     text += "<td><center><div style=\"width: 30px;\" id=l" + i + "></div></center></td>";
     text += "<td><center>";
     text += "<div id=w" + i + " style=\"width: 120px;\">";
     text += "<div style=\"color: red;\" onclick=\"whattodo('" + i + "');\" ";
     text += "title=\"frequency " + frequency[alphabetic_order[i]] + "\n";
     text += "verify " + verify[alphabetic_order[i]] + "\n";
     text += "index " + index[alphabetic_order[i]] + "\n";
     text += "\">" + word[alphabetic_order[i]] + "</div>";
     text += "</div>";
     text += "</center></td>";
     text += "<td><center><div style=\"width: 30px;\" id=r" + i + "></div></center></td>";
     text += "</tr></tbody></table>";
     text += "</div>";
    }else{ // 4
     text += "<center>";
     text += "<div id=w" + i + " style=\"color: green; width: 180px;\" ";
     text += "title=\"frequency " + frequency[alphabetic_order[i]] + "\n";
     text += "verify " + verify[alphabetic_order[i]] + "\n";
     text += "index " + index[alphabetic_order[i]] + "\n";
     text += "\" ";
     text += "onclick=\"rechange('" + i + "');\">";
     text += word[alphabetic_order[i]] + "</div>";
     text += "</center>";
    } // 4
    text += "</td></tr>";
   }else if(lit == 'All'){ // 3
    text += "</tbody></table>";
    text += "</td>";
    text += "</tr>";
    liter = ci;
    text += "<tr><td><span style=\"color: #1fa; font-size: 30px;\">" + print_word(liter, '') + "</span></td>";
    text += "<td>";
    text += "<table><tbody>";
    text += "<tr><td>";
    if(verify[alphabetic_order[i]] == "no"){ // 4
     text += "<div id=c" + i + ">";
     text += "<table cellspacing=0 cellpadding=0><tbody><tr>";
     text += "<td><center><div style=\"width: 30px;\" id=l" + i + "></div></center></td>";
     text += "<td><center>";
     text += "<div id=w" + i + " style=\"width: 120px;\">";
     text += "<div style=\"color: red;\" onclick=\"whattodo('" + i + "');\" ";
     text += "title=\"frequency " + frequency[alphabetic_order[i]] + "\n";
     text += "verify " + verify[alphabetic_order[i]] + "\n";
     text += "index " + index[alphabetic_order[i]] + "\n";
     text += "\">";
     text += word[alphabetic_order[i]] + "</div>";
     text += "</div>";
     text += "</center></td>";
     text += "<td><center><div style=\"width: 30px;\" id=r" + i + "></div></center></td>";
     text += "</tr></tbody></table>";
     text += "</div>";
    }else{ // 4
     text += "<center>";
     text += "<div id=w" + i + " style=\"color: green; width: 180px;\" ";
     text += "title=\"frequency " + frequency[alphabetic_order[i]] + "\n";
     text += "verify " + verify[alphabetic_order[i]] + "\n";
     text += "index " + index[alphabetic_order[i]] + "\n";
     text += "\" ";
     text += "onclick=\"rechange('" + i + "');\">";
     text += word[alphabetic_order[i]] + "</div>";
     text += "</center>";
    } // 4
    text += "</td></tr>";
   } // 3
   i++;
   if(op == 'verified'){ // 3
    do{ if(verify[alphabetic_order[i]] != 'no') break; i++;} while(i < M);
   } // 3
   if(op == 'check'){ // 3
    do{ if(verify[alphabetic_order[i]] == 'no') break; i++;} while(i < M);
   } // 3
  } // 2
  text += "</tbody></table>";
  text += "</td>";
  text += "</tr>";
  text += "</tbody></table></center>";
 } // 1
 text += "<br><br>";
 text += "<center>";
 text += "<table><tbody>";
 text += "<tr><td>";
// text += "<div style=\"width: 180px;\">";
 text += "<div>";
// text += "code here<br>click on textarea<br>press Ctrl-A, Ctrl-C<br>open file named 'dictionary.txt'<br>click there Ctrl-A, Ctrl-V, Ctrl-S<br>close file";
 text += get_stamp(keywords.code_comment);
 text += "</div>";
 text += "</td><td>";
 


 
 code = getDictCode(0); // 19:42 14.11.2016
 
 text += "<div onclick=\"save();\" ";
 text += "style=\"background: #ccc; border: blue 1px solid; color: green;\" ";
 text += "onmouseover=\"this.style.border='green 1px solid'; this.style.color='blue'; this.style.background='#eee';\" ";
 text += "onmouseout=\"this.style.border='blue 1px solid'; this.style.color='green'; this.style.background='#ccc';\">";
// text += "Click to save";
 text += get_stamp(keywords.code_save);
 text += "</div>";
 
 text += "<textarea id=dic_c style=\"width: 400px; height: 120px;\">";
 text += code;
 text += "</textarea>";
 text += "</td></tr>";
 text += "</tbody></table>";
 text += "</center>";
 obj.innerHTML = text;
 butt(2);
}

function save(){
// var obj = document.getElementById('dic_c');
// if(!obj) return;
// code = obj.value;
// alert(code);
 var obj = document.createElement('a');
 obj.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
 obj.setAttribute(folder, pre + 'dictionary.txt');
 obj.click();
}

function rechange(n){
 if(n < 0) return;
 if(n >= M) return;
 obj = document.getElementById('r' + n);
 if(obj){
  verify[alphabetic_order[n]] = "no";
  dic();
 }else{
  obj = document.getElementById('w' + n);
  if(obj) obj.innerHTML += "<div id=r" + n + " hidden style=\"font-size: 0px;\"></div>";
 }
 return;
}

var glen = configuration.index_generation_length;

function gen_ind(code){
 var indx = 0;
 if(code == '') return 0;
 l = code.substr(0, 4);
 cl = code.substring(4, code.length);
 for(var i = 0; i < glen; i++){
  if(l != ""){
   il = -1; match = "n";
   for(var j = 0; j < eval(Acount); j++){
    if(l == get_hex(Alphabet[alphabet_sort[j]][1])){
     il = eval(alphabet_sort[j] + Pcount);
     alphabet_freq[alphabet_sort[j]]++;
     match = "y";
     break;
    }
   }
   for(var j = 0; j < eval(Pcount); j++){
    if(l == get_hex(Parsers[j])){
     il = eval(j);
     match = "y";
     break;
    }
   }
//   if(l == "002D"){ il = 0; match = 'y'; }
   if(match == "y"){ indx += il;}
   else il = 0;
  }
  indx *= eval(Acount + Pcount);
  if(cl == ""){l = ""; cl = "";}
  else{
   l = cl.substr(0, 4);
   cl = cl.substring(4, cl.length);
  }
 }
 return indx;
}

function whattodo(n){
 var obj = document.getElementById('w' + n);
 if(obj) obj.innerHTML = "<div style=\"color: yellow;\" onclick=\"edit_word('" + n + "');\">" + word[alphabetic_order[n]] + "</div>";

 var obj = document.getElementById('l' + n);
 if(obj) obj.innerHTML = "<div style=\"border: red 1px solid; color: red;\" title=\"" + get_stamp(keywords.remove) + "\" onclick=\"remove_word('" + n + "');\"><img src=remove.bmp></img></div>";

 var obj = document.getElementById('r' + n);
 if(obj) obj.innerHTML = "<div style=\"border: green 1px solid; color: green;\" title=\"" + get_stamp(keywords.verify) + "\" onclick=\"verify_word('" + n + "');\"><img src=correct.bmp></img></div>";
}

function back(n){
 var obj = document.getElementById('w' + n);
 if(obj) obj.innerHTML = "<div style=\"color: red;\">" + word[alphabetic_order[n]] + "</div>";

 var obj = document.getElementById('l' + n);
 if(obj) obj.innerHTML = "";

 var obj = document.getElementById('r' + n);
 if(obj) obj.innerHTML = "";
}

function edit_word(n){
 if(n < 0) return;
 if(n >= M) return;
 var obj = document.getElementById('w' + n);
 if(obj){
  text = "";
  text += "<input type=text size=15 id=i" + n + " onblur=\"edit_freeze('" + n + "', this.value);\" value=\"" + word[alphabetic_order[n]] + "\"></input>";
  obj.innerHTML = text;
 }
}

function edit_freeze(n, value){
 if(n < 0) return;
 if(n >= M) return;
 k = alphabetic_order[n];
 word[k] = value;
 coding[k] = get_code(word[k]);
 index[k] = gen_ind(coding[k]);
 if(sorted == 'false') asort();
 l = sorted;
 sorted = "false";
 for(i = n; i < M - 1; i++){ // 1
  if(eval(index[alphabetic_order[i]]) > eval(index[alphabetic_order[eval(i) + 1]])){ // 2
   tmp = alphabetic_order[i];
   alphabetic_order[i] = alphabetic_order[eval(i) + 1];
   alphabetic_order[eval(i) + 1] = tmp;
  }else if (eval(index[alphabetic_order[i]]) == eval(index[alphabetic_order[eval(i) + 1]])){ // 2
   lenu = (coding[alphabetic_order[i]]).length;
   iu = gen_ind((coding[alphabetic_order[i]]).substring(glen * 4 - 1, lenu));
   lend = (coding[alphabetic_order[eval(i) + 1]]).length;
   id = gen_ind((coding[alphabetic_order[eval(i) + 1]]).substring(glen * 4 - 1, lend));
   if(iu > id){ // 3
    tmp = alphabetic_order[i];
    alphabetic_order[i] = alphabetic_order[eval(i) + 1];
    alphabetic_order[eval(i) + 1] = tmp;
   }else break; // 3
  }else break; // 2
 } // 1
 for(i = n; i > 0; i--){ // 1
  if(eval(index[alphabetic_order[i]]) < eval(index[alphabetic_order[i - 1]])){ // 2
   tmp = alphabetic_order[i];
   alphabetic_order[i] = alphabetic_order[i - 1];
   alphabetic_order[i - 1] = tmp;
  }else if (eval(index[alphabetic_order[i]]) == eval(index[alphabetic_order[i - 1]])){ // 2
   lenu = (coding[alphabetic_order[i]]).length;
   iu = gen_ind((coding[alphabetic_order[i]]).substring(glen * 4 - 1, lenu));
   lend = (coding[alphabetic_order[i - 1]]).length;
   id = gen_ind((coding[alphabetic_order[i - 1]]).substring(glen * 4 - 1, lend));
   if(iu < id){ // 3
    tmp = alphabetic_order[i];
    alphabetic_order[i] = alphabetic_order[i - 1];
    alphabetic_order[i - 1] = tmp;
   }else break; // 3
  }else break; // 2
 } // 1
 sorted = l;
 asort();
 compa();
 dic();
}

function get_code(w){
 var code = "";
 for(var i = 0; i < w.length; i++){
  u = w.substr(i, 1);
  var match = "no";
  for(var j = 0; j < Acount; j++){
   l = print_word(get_hex(Alphabet[alphabet_sort[j]][1]), '');
   if(u == l){
    code += get_hex(Alphabet[alphabet_sort[j]][1]);
    match = 'yes';
    break;
   }
   l = print_word(get_hex(Alphabet[alphabet_sort[j]][0]), '');
   if(u == l){
    code += get_hex(Alphabet[alphabet_sort[j]][1]);
    match = 'yes';
    break;
   }
  }
  for(var j = 0; j < Pcount; j++){
   l = print_word(get_hex(Parsers[j]), '');
   if(u == l){
    code += get_hex(Parsers[j]);
    match = 'yes';
    break;
   }
  }
//  if(u == '-'){ code += "002D"; match = 'yes'; };
  if(match == "no") alert("unknown symbol");
 }
// alert("word " + w + "\n" + "code " + code);
 return code;
}

function remove_word(n){
 if(n < 0) return;
 if(n >= M) return;
 k = alphabetic_order[n];
 coding[k] = "";
 verify[k] = "";
 word[k] = "";
 frequency[k] = "";
 for(i = n; i < M - 1; i++) alphabetic_order[i] = alphabetic_order[eval(i) + 1];
 M--; 
 dic();
}

function get_time_stamp(){
 time = new Date();
 time_stamp = "";
 time_stamp += "" + ((time.getDate() < 10)?"0":"") + time.getDate();
 time_stamp += "/" + (((time.getMonth() + 1) < 10)?"0":"") + (time.getMonth() + 1);
 time_stamp += "/" + (time.getYear() + ((navigator.appName == 'Microsoft Internet Explorer')?0:1900));
 time_stamp += " " + ((time.getHours()<10)?"0":"") + time.getHours();
 time_stamp += ":" + ((time.getMinutes()<10)?"0":"") + time.getMinutes();
 time_stamp += ":" + ((time.getSeconds()<10)?"0":"") + time.getSeconds();
 time_stamp += " +6 UTC";
 return time_stamp;
}

function verify_word(n){
 if(n < 0) return;
 if(n >= M) return;
 k = alphabetic_order[n];
 verify[k] = "yes " + get_time_stamp();
 dic();
}

function wor(){
 var obj = document.getElementById('show');
 if(!obj) return;
 keywords = settings.keywords.word;
 var text = "";
 text += "<table cellspacing=30 cellpadding=30><tbody><tr><td>";
 text += "<div id=coding style=\"font-size: 30;\">";
// p = 13;
 p = settings.word.row_length;
 text += "<table cellpadding=5px cellspacing=3px><tbody>";
 for(var i = 0; i < Acount; i++){
  if(i % p == 0) text += "<tr>";
  text += "<td>";
  text += "<div onmouseover=\"this.style.color='#0ed';\" onmouseout=\"this.style.color='#0aa';\" ";
  text += "style=\"color: #0aa; border: green 1px solid; font-size: 30px; width: 40px; height: 40px;\" ";
  text += "title=\"" + get_stamp(keywords.type_title) + "\" ";
  text += "onclick=\"writeu('" + get_hex(Alphabet[i][1]) + "');\">";
  text += "<center>" + print_word(get_hex(Alphabet[i][1]), '') + "</center>";
  text += "</div>";
  text += "</td>";
  if(i % p == p - 1) text += "</tr>";
 }
 if(Acount % p != 0) text += "</tr>";
 text += "</tbody></table>";
 text += "<table cellpadding=5px cellspacing=3px><tbody>";
 for(var i = 0; i < Pcount; i++){
  if(i % p == 0) text += "<tr>";
  text += "<td>";
  text += "<div onmouseover=\"this.style.color='#0ed';\" onmouseout=\"this.style.color='#0aa';\" ";
  text += "style=\"color: #0aa; border: green 1px solid; font-size: 30px; width: 40px; height: 40px;\" ";
  text += "title=\"" + get_stamp(keywords.type_title) + "\" ";
  text += "onclick=\"writeu('" + get_hex(Parsers[i]) + "');\">";
  text += "<center>" + print_word(get_hex(Parsers[i]), '') + "</center>";
  text += "</div>";
  text += "</td>";
  if(i % p == p - 1) text += "</tr>";
 }
 text += "</tbody></table>";
 text += "</div>";
 text += "</td><td>";
 text += "<div id=new_d></div>";
 text += "<br>";
 text += "<div id=text_d>";
 text += "<div id=text style=\"border: green 1px solid; color: green;\" onclick=\"write_word();\">" + get_stamp(keywords.write) + "</div>";
 text += "</div>";
 text += "<div id=code hidden style=\"font-size: 0px;\"></div>";
// text += "<div id=code></div>";
 text += "<br>";
 text += "<div id=add_d></div>";
 text += "</td><td>";
 text += "<div id=match_d></div>";
 text += "</td></tr></tbody></table>";
 obj.innerHTML = text;
 butt(0);

/*
 obj = document.createElement('scr' + 'ipt');
 obj.id = 'new_scr';
 obj.innerHTML = "pin_all('coding');";

 document.getElementsByTagName('head')[0].appendChild(obj);
 obj.parentNode.removeChild(obj);
*/
}

function tex(){
 var obj = document.getElementById('show');
 if(!obj) return;
 keywords = settings.keywords.text;
 var text = "";
 text += "<table cellspacing=8 cellpadding=6><tbody>";
 text += "<tr><td>";
 text += get_stamp(keywords.type);
 text += "<tr><td>";
 text += "<div id=fin_b style=\"border: green 1px solid; color: green; width: 100px;\" ";
 text += "onmouseover=\"this.style.color='yellow';\" onmouseout=\"this.style.color='green';\" ";
 text += "title=\"";
 text += get_stamp(keywords.check_title);
 text += "\" ";
 text += "onclick=\"find();\">";
 text += get_stamp(keywords.check);
 text += "</div>";
// copy&m b 18:22 16.11.2016
 text += "<div id=fin_b style=\"border: green 1px solid; color: green; width: 100px;\" ";
 text += "onmouseover=\"this.style.color='yellow';\" onmouseout=\"this.style.color='green';\" ";
 text += "title=\"";
 text += get_stamp(keywords.check_title);
 text += "\" ";
 text += "onclick=\"addDict();\">"; // m 18:23 16.11.2016
 text += get_stamp(keywords.check) + " (dict)"; // m 20:20 16.11.2016
 text += "</div>";
// copy&m e 18:22 16.11.2016
 text += "</td></tr>";
 text += "<tr><td>";
 text += "<div id=tex_a>";
// text += "<div id=text_d title=\"" + get_stamp(keywords.edit_title) + "\" style=\"border: green 1px solid; font-size: 13.5px; width: 810px; height: 50px;\" onclick=\"new_t();\"></div>"; // 23:09 14.11.2016

 text += "<textarea id=text_m style=\"width: 810px; height: 250px;\">";

 hobj = document.getElementById('text_h');
 if(hobj) text += hobj.innerHTML;
 else text += "";

 text += "</textarea>";
 text += "</div>";
 text += "</td>";
 text += "<td>";
 text += "<table cellpadding=2><tbody>";
 text += "<tr><td>";
 text += "<div id=fin_a>";
 text += get_stamp(keywords.founded);
 text += "</div>";
 text += "</td></tr>";
 text += "<tr><td>";
 text += "<div id=wor_l style=\"border: green 1px solid;\">";
 text += get_stamp(keywords.empty);
 text += "</div>";
 text += "</td></tr>";
 text += "</tbody></table>";
 text += "</td>";
 text += "<td>";
 text += "<div id=log></div>";
 text += "</td>";
 text += "</tr>";
 text += "</tbody></table>";
 obj.innerHTML = text;
 butt(1);

 obj = document.createElement('scr' + 'ipt');
 obj.id = 'new_scr';
 obj.innerHTML = "pin_all('coding');";
 
 document.getElementsByTagName('head')[0].appendChild(obj);
 obj.parentNode.removeChild(obj);
}

var word_founded = new Array();
var coding_founded = new Array();
var index_founded = new Array();
var frequency_founded = new Array();
var verify_founded = new Array();
var indict_founded = new Array();
var count_founded = 0;
var founded_alphabetic = new Array();
var founded_links = new Array();
var founded_links_count = new Array();


// copy&m b 23:01 14.11.2016
var count_founded = 0;
var sym_processed = 0;
var words_in_text = 0;
var sym_all = 0;
// copy&m e 23:02 14.11.2016

// copy&m b 18:24 16.11.2016
// copy find() 18:25 16.11.2016
function addDict(){
 var obj = document.getElementById('text_m');
 if(!obj) return;
 value = obj.value;

 obj = document.getElementById('wor_l');
 if(!obj) return;
 obj.innerHTML = "";
 
 var link = 0;
 var code = "";
 var word = "";
 var indict = "no";
 var line = 1;
 var linelen = 0;
 var linecur = 0;
 var linenewreq = 0;
 var linesymcount = 100;
 var new_founded = 0;
 var match = 'no';

 sym_all = value.length;
 for(i = 0; i < value.length; i++){
  u = value.substr(i, 1);
  sym_processed++;
  if(u == '\n'){
   line ++;
   linenewreq += Math.round(linecur/linesymcount);
   if(linecur > linelen) linelen = linecur;
   linecur = 0;
  }else{
   if(line == 0) line++;
   linecur++;
  }
  match = 'no';
  
  var down_boundary_condition = (u < print_sym(get_hex(alphabet_bottom),''));
  var up_boundary_condition = (u > print_sym(get_hex(alphabet_top), ''));
  
  var parsers_condition = "false";
  for(j = 0; j < Pcount; j++){
   parsers_condition |= ( u == print_sym(get_hex(Parsers[j]), ''));
  }
  

  if( (down_boundary_condition || up_boundary_condition) && !parsers_condition){}
  else{
   if(parsers_condition){
    for(j = 0; (j < Pcount) && match != 'yes'; j++){
     l = print_sym(get_hex(Parsers[j]), '');
     if(u == l){
      code += get_hex(Parsers[j]);
      word += l; match = 'yes'; break;
     }
    }
   }
   for(j = 0; (j < Acount) && match != 'yes'; j++){
    l = print_word(get_hex(Alphabet[alphabet_sort[j]][1]), '');
    if(u == l){
     code += get_hex(Alphabet[alphabet_sort[j]][1]);
     word += l; match = 'yes'; break;
     }
    l = print_word(get_hex(Alphabet[alphabet_sort[j]][0]), '');
    if(u == l){
     code += get_hex(Alphabet[alphabet_sort[j]][1]);
     word += l; match = 'yes'; break;
    } 
   }
  }
  if(match == 'no' && code != ""){
   words_in_text++;
   proc_log = document.getElementById('log');
   if(proc_log){
    if(sym_all > 0){
     proc_log.innerHTML = "process " + sym_processed + " symbols of " + sym_all + " (" + Math.round(1000 * sym_processed/sym_all)/10 + "%)";
    }
   }
   link++;
   indict = "no";
   searchin(code, link);
   code = ""; word = "";
  }else if(match == 'no'){
  }
 }
 if(match == 'yes' && code != ""){
   words_in_text++;
   link++;
   indict = "no";
   searchin(code, link);
 }
 for(g = 0; g < count_founded; g++){
  if(indict_founded[g] == 'no'){
    new_founded++;
    text = "";
    setTimeout("highlight('" + g + "', 'red');", 10);
    text += "<div id=fw" + g + " title=\"";
    text += get_stamp(keywords.insert_title);
    text += "\" ";
    text += "onmouseover=\"highlight('" + g + "','#c0f');\" onmouseout=\"highlight('" + g + "','red');\" ";
    text += "onclick=\"highlight('" + g + "', '#000000'); insertf('" + g + "','" + frequency_founded[g] + "');\">" + print_word(coding_founded[g], '') + "</div>";
    text += "<div id=fc" + g + " hidden style=\"font-size: 0px;\">" + coding_founded[g] + "</div>";
    obj.innerHTML += text;
  }else{
   frequency[alphabetic_order[indict_founded[g]]] = frequency_founded[g];
   verify[alphabetic_order[indict_founded[g]]] = auto_verify(verify[alphabetic_order[indict_founded[g]]], frequency_founded[g])
  }
 }
 if(obj.innerHTML == "") obj.innerHTML = get_stamp(keywords.empty);

 obj = document.getElementById('log');
 if(obj) obj.innerHTML = get_stamp(keywords.word_count) + " " + words_in_text + "<br>" + get_stamp(keywords.found_left) + " " + count_founded + " " + get_stamp(keywords.found_right) + "<br>" + get_stamp(keywords.unknown) + " " + new_founded;

 alphabet_sorting();
}
// copy&m e 18:24 16.11.2016

function find(){
/* // replace 23:01 14.11.2016
 count_founded = 0;
 var sym_processed = 0;
 var words_in_text = 0;
 var sym_all = 0;
*/
 var obj = document.getElementById('text_m');
 if(!obj) return;
 value = obj.value;

 obj = document.getElementById('wor_l');
 if(!obj) return;
 obj.innerHTML = "";
 
 var link = 0;
 var code = "";
 var word = "";
 var indict = "no";
 var htm = "";
 var line = 1;
 var linelen = 0;
 var linecur = 0;
 var linenewreq = 0;
 var linesymcount = 100;
 var new_founded = 0;
 var match = 'no';

 sym_all = value.length;
 for(i = 0; i < value.length; i++){
  u = value.substr(i, 1);
  sym_processed++;
//  if(u == '\n')   alert("u '\\n'");
//  else if (u == " ") alert("u '&sp;'");
//  else alert("u '" + u + "'");
  if(u == '\n'){
   line ++;
   linenewreq += Math.round(linecur/linesymcount);
//   alert("linecur " + linecur + "\n" + "linenewreq " + linenewreq);
   if(linecur > linelen) linelen = linecur;
   linecur = 0;
  }else{
   if(line == 0) line++;
   linecur++;
  }
  match = 'no';
  
  var down_boundary_condition = (u < print_sym(get_hex(alphabet_bottom),''));
  var up_boundary_condition = (u > print_sym(get_hex(alphabet_top), ''));
  
  var parsers_condition = "false";
  for(j = 0; j < Pcount; j++){
   parsers_condition |= ( u == print_sym(get_hex(Parsers[j]), ''));
  }
  

  if( (down_boundary_condition || up_boundary_condition) && !parsers_condition){}
  else{
   if(parsers_condition){
    for(j = 0; (j < Pcount) && match != 'yes'; j++){
     l = print_sym(get_hex(Parsers[j]), '');
     if(u == l){
      code += get_hex(Parsers[j]);
      word += l; match = 'yes'; break;
     }
    }
   }
   for(j = 0; (j < Acount) && match != 'yes'; j++){
    l = print_word(get_hex(Alphabet[alphabet_sort[j]][1]), '');
    if(u == l){
     code += get_hex(Alphabet[alphabet_sort[j]][1]);
     word += l; match = 'yes'; break;
     }
    l = print_word(get_hex(Alphabet[alphabet_sort[j]][0]), '');
    if(u == l){
     code += get_hex(Alphabet[alphabet_sort[j]][1]);
     word += l; match = 'yes'; break;
    } 
   }
  }
  if(match == 'no' && code != ""){
   words_in_text++;
   proc_log = document.getElementById('log');
   if(proc_log){
    if(sym_all > 0){
     proc_log.innerHTML = "process " + sym_processed + " symbols of " + sym_all + " (" + Math.round(1000 * sym_processed/sym_all)/10 + "%)";
//     alert("process " + sym_processed + " symbols of " + sym_all + " (" + Math.round(1000 * sym_processed/sym_all)/10 + "%)");
    }
   }
   link++;
   indict = "no";
   searchin(code, link);
   htm += "<span id=link" + link + " onmouseover=\"link_over('" + link + "');\" onmouseout=\"link_out('" + link + "');\" onclick=\"link_click('" + link + "');\">" + word + "</span>";
   code = ""; word = "";
   if(u == '\n') htm += "<br>"; else htm += u;
  }else if(match == 'no'){
   if(u == '\n') htm += "<br>"; else htm += u;
  }
 }
 if(match == 'yes' && code != ""){
   words_in_text++;
   link++;
   indict = "no";
   searchin(code, link);
   htm += "<span id=link" + link + " onmouseover=\"link_over('" + link + "');\" onmouseout=\"link_out('" + link + "');\" onclick=\"link_click('" + link + "');\">" + word + "</span>";
 }
/*
 text = ""; for(g = 0; g < count_founded; g++){
  text += founded_alphabetic[g];
  k = founded_alphabetic[g];
  text += " " + word_founded[k];
  text += " " + coding_founded[k];
  text += " " + index_founded[k];
  text += " " + frequency_founded[k];
  text += " " + indict_founded[k];
  text += " " + verify_founded[k];
  text += " " ;
  text += "{";
  for(hj = 0; hj < founded_links_count[k]; hj++){
   if(hj != 0) text += ", ";
   text += founded_links[k][hj];
  }
  text += "}";
  text += "\n";
 } alert(text);
*/
 for(g = 0; g < count_founded; g++){
  if(indict_founded[g] == 'no'){
    new_founded++;
    text = "";
    setTimeout("highlight('" + g + "', 'red');", 10);
    text += "<div id=fw" + g + " title=\"";
    text += get_stamp(keywords.insert_title);
    text += "\" ";
    text += "onmouseover=\"highlight('" + g + "','#c0f');\" onmouseout=\"highlight('" + g + "','red');\" ";
    text += "onclick=\"highlight('" + g + "', '#000000'); insertf('" + g + "','" + frequency_founded[g] + "');\">" + print_word(coding_founded[g], '') + "</div>";
    text += "<div id=fc" + g + " hidden style=\"font-size: 0px;\">" + coding_founded[g] + "</div>";
    obj.innerHTML += text;
  }else{
   frequency[alphabetic_order[indict_founded[g]]] = frequency_founded[g];
   verify[alphabetic_order[indict_founded[g]]] = auto_verify(verify[alphabetic_order[indict_founded[g]]], frequency_founded[g])
//   if(frequency_founded[g] >= configuration.auto_verification_count){
//    if(verify[alphabetic_order[indict_founded[g]]] == 'no') verify[alphabetic_order[indict_founded[g]]] = "auto " + get_time_stamp();
//   }
  }
 }
/*
 text = ""; for(g = 0; g < count_founded; g++){
  text += " " + word_founded[g];
  text += " " + coding_founded[g];
  text += " " + index_founded[g];
  text += " " + frequency_founded[g];
  text += " " + indict_founded[g];
  text += " " + verify_founded[g];
  text += " " ;
  text += "{";
  for(var hj = 0; hj < founded_links_count[g]; hj++){
   if(hj != 0) text += ", ";
   text += founded_links[g][hj];
  }
  text += "}";
  text += "\n";
 } alert(text);
*/
 if(obj.innerHTML == "") obj.innerHTML = get_stamp(keywords.empty);

 obj = document.getElementById('log');
 if(obj) obj.innerHTML = get_stamp(keywords.word_count) + " " + words_in_text + "<br>" + get_stamp(keywords.found_left) + " " + count_founded + " " + get_stamp(keywords.found_right) + "<br>" + get_stamp(keywords.unknown) + " " + new_founded;

 obj = document.getElementById('tex_a');  // skip 23:13 14.11.2016
// obj = document.getElementById('text_d'); // add 23:13 14.11.2016
 if(!obj) return;
 obj.innerHTML = "<div id=text_d title=\"" + get_stamp(keywords.edit_title) + "\" style=\"border: green 1px solid; font-size: 13.5px; width: 810px; height: " + Math.round(eval(line + linenewreq) * 17.0) + "px;\" onclick=\"new_t();\">" + htm + "</div>"; // skip 23:14 14.11.2016
// obj.innerHTML += htm; // add 23:14 14.11.2016
 
 obj = document.getElementById('text_h');
 if(obj) obj.innerHTML = value;
 else{
/*
  obj = document.createElement('div');
  obj.id = 'text_h';
  obj.hidden = 'true';
  obj.style = 'font-size: 0px';
  obj.innerHTML = value;
*/
//  document.getElementsByTagName('body')[0].appendChild(obj);
  document.getElementsByTagName('body')[0].innerHTML += "<div id=text_h hidden style=\"font-size: 0px;\">" + value + "</div>";
 }
 alphabet_sorting();
}

function auto_verify(value, count){
 if(items('automatic verification words in dictionary') != 'enable') return value;
 if(count >= configuration.auto_verification_count){
  if(value == 'no') return ("auto " + get_time_stamp());
 }
 return value;
}

function get_link_bound(l){
 var g = -1;
 for(i = 0; i < count_founded; i++){
  for(j = 0; j < founded_links_count[i]; j++){
   if(founded_links[i][j] == l){ g = i; break; }
  }
  if(g != -1) break;
 }
 return g;
}

function link_over(l){
 var g = get_link_bound(l);
 if(g == -1) return;
 if(indict_founded[g] == 'no') setTimeout("highlight('" + g + "', '#c0f');", 10);
 else if(verify_founded[g] == 'no') setTimeout("highlight('" + g + "', '#FFCC00');", 10);
 else setTimeout("highlight('" + g + "', '#00FF10');", 10);
}

function link_out(l){
 var g = get_link_bound(l);
 if(g == -1) return;
 if(indict_founded[g] == 'no') setTimeout("highlight('" + g + "', 'red');", 10);
 else if(verify_founded[g] == 'no') setTimeout("highlight('" + g + "', 'black');", 10);
 else setTimeout("highlight('" + g + "', 'black');", 10);
}

var edit_enable = 'yes';

function link_click(l){
 var g = get_link_bound(l);
 if(g == -1) return;
 if(indict_founded[g] == 'no'){
  setTimeout("highlight('" + g + "', 'black');", 10);
  insertf(g, frequency_founded[g]);
 }
 edit_enable = 'no';
}

function highlight(g, color){
 if(g < 0) return;
 if(g >= count_founded) return;
 for(i = 0; i < founded_links_count[g]; i++){
  obj = document.getElementById('link' + founded_links[g][i]);
  if(obj) obj.style.color = color;
 }
}

function new_t(){
 if(edit_enable == 'no'){
  edit_enable = 'yes';
  return;
 }
 obj = document.getElementById('text_h');
 if(!obj) return;
 T = obj.innerHTML;
 obj = document.getElementById('tex_a');
 if(!obj) return;
 obj.innerHTML = "<textarea id=text_m style=\"width: 810px; height: 250px;\">" + T + "</textarea>";
 asort(); compa();
 edit_enable = 'yes';
}

function insertf(n, count){ // 0

 var obj = document.getElementById('fc' + n);
 if(!obj) return; // 1
 code = obj.innerHTML;
 obj.parentNode.removeChild(obj);

 var obj = document.getElementById('fw' + n);
 if(obj) obj.parentNode.removeChild(obj); // 1

 if(sorted == 'false') asort(); // 1
 indict_founded[n] = 'yes';

 word[N] = print_word(code, '');
 coding[N] = code;
 verify[N] = auto_verify('no', count);
 var indx = gen_ind(code);
 index[N] = indx;
 var len = code.length;
 frequency[N] = count;
 alphabetic_order[M] = N;
 N++;
 M++;


 var l = sorted;
 sorted = 'false'; 

 for(var i = M - 1; i > 0; i--){ // 1
  if(eval(index[alphabetic_order[i]]) < eval(index[alphabetic_order[i - 1]])){ // 2
   tmp = alphabetic_order[i];
   alphabetic_order[i] = alphabetic_order[i - 1];
   alphabetic_order[i - 1] = tmp;
  }else if(eval(index[alphabetic_order[i]]) == eval(index[alphabetic_order[i - 1]])){ // 2
   lenu = (coding[alphabetic_order[i]]).length;
   iu = gen_ind((coding[alphabetic_order[i]]).substring(glen * 4, lenu));
   lend = (coding[alphabetic_order[i - 1]]).length;
   id = gen_ind((coding[alphabetic_order[i - 1]]).substring(glen * 4, lend));
   if(iu < id){ // 3
    tmp = alphabetic_order[i];
    alphabetic_order[i] = alphabetic_order[i - 1];
    alphabetic_order[i - 1] = tmp;
   }else break; // 3
  }else break; // 2
 } // 1
 sorted = l;

 obj = document.getElementById('log');
 if(obj){
   obj.innerHTML = get_stamp(keywords.inserted_left) + " '" + print_word(code, '') + "' " + get_stamp(keywords.inserted_right);
 }

 obj = document.getElementById('wor_l');
 if(obj){
  if(obj.innerHTML == "") obj.innerHTML = get_stamp(keywords.empty);
 }
}

function set(a){
 this.innerHTML = print_word(a, '');
}

function write_word(){
 if(items('typing word by keyboard') != 'enable') return;
 obj = document.getElementById('text');
 if(!obj) return;
 var value = obj.innerHTML;
 obj = document.getElementById('text_d');
 if(!obj) return;
 var text = "";
 text += "<input id=text_i type=text onblur=\"freeze();\" value=\"" + ((value == get_stamp(keywords.write))?"":value) + "\">"
 obj.innerHTML = text;
 obj = document.getElementById('new_d');
 if(obj) obj.innerHTML = "";
 obj = document.getElementById('add_d');
 if(obj) obj.innerHTML = "";
 obj = document.getElementById('match_d');
 if(obj){
  text = "";
  text += "<div style=\"border: yellow 1px solid; color: yellow; background: green;\" onclick=\"freeze(); check();\">" + get_stamp(keywords.check) + "</div>";
  obj.innerHTML = text;
 }
}

function freeze(){
 obj = document.getElementById('text_i');
 if(!obj) return;
 value = obj.value;

 obj = document.getElementById('text_d');
 if(!obj) return;
 var text = "";
 if(value == "") text += "<div id=text style=\"border: green 1px solid; color: green;\" onclick=\"write_word();\">" + get_stamp(keywords.write) + "</div>";
 else text += "<div id=text style=\"color: green;\" onclick=\"write_word();\">" + value + "</div>";
 obj.innerHTML = text;
 if(value == ""){
  obj = document.getElementById('new_d');
  if(obj) obj.innerHTML = "";
  obj = document.getElementById('add_d');
  if(obj) obj.innerHTML = "";
  return;
 }

 code = get_code(value); 
 obj = document.getElementById('code');
 if(obj) obj.innerHTML = code;

 obj = document.getElementById('new_d');
 if(obj){
  text = "";
  text += "<div id=add style=\"background: #ad1; border: yellow 1px solid; color: blue;\" ";
  text += "onmouseover=\"this.style.color='#0af';\" ";
  text += "onmouseout=\"this.style.color='blue';\" ";
  text += "onclick=\"refresh();\">" + get_stamp(keywords.new) + "</div>";
  obj.innerHTML = text;
 }
 var match = 'no';
 match = wsearch(code);
 obj = document.getElementById('match_d');
 if(obj){
  if(match == 'no') obj.innerHTML = get_stamp(keywords.unknown);
  else obj.innerHTML = get_stamp(keywords.known);
 }
 obj = document.getElementById('add_d');
 if(obj){
  if(match == 'no'){
   text = "";
   text += "<div id=add style=\"background: #ad1; border: red 1px solid; color: blue;\" ";
   text += "onmouseover=\"this.style.color='#0af';\" ";
   text += "onmouseout=\"this.style.color='blue';\" ";
   text += "onclick=\"insert();\">" + get_stamp(keywords.insert) + "</div>";
   obj.innerHTML = text;
  }else obj.innerHTML = "";
 }
}

var alphabet_bottom = 0xFFFF;
var alphabet_top = 0x0000;
var alphabet_middle_low = 0xFFFF;
var alphabet_middle_high = 0x0000;

function alphabet_range(){
// var range = 0;
// var low = new Array();
// var high = new Array();
// var len = new Array();
 for(i = 0; i < Acount; i++){
  if(Alphabet[i][0] > alphabet_top) alphabet_top = Alphabet[i][0];
  if(Alphabet[i][1] > alphabet_top) alphabet_top = Alphabet[i][1];
  if(Alphabet[i][0] < alphabet_bottom) alphabet_bottom = Alphabet[i][0];
  if(Alphabet[i][1] < alphabet_bottom) alphabet_bottom = Alphabet[i][1];
 }
/*
 if(alphabet_bottom != 0xFFFF) cur_low = alphabet_bottom;
 if(alphabet_top != 0x0000) cur_high = alphabet_top;
 cur = cur_low;
 while(cur < cur_high){
  
 }
*/
// alert("top: " + alphabet_top + "\nbottom: " + alphabet_bottom);
// alert("middle " + alphabet_middle_low + "-" + alphabet_middle_high);
}

function alphabet_sorting(){
 for(var i = Acount - 1; i > 0; i--){
  for(var j = 0; j < i; j++){
   if(eval(alphabet_freq[alphabet_sort[j]]) < eval(alphabet_freq[alphabet_sort[j + 1]])){
    tmp = alphabet_sort[j];
    alphabet_sort[j] = alphabet_sort[j + 1];
    alphabet_sort[j + 1] = tmp;
   }
  }
 }
}

function check(){
 var s = new Array();
 s[0] = new Array(0x04D8, 0x04D9);
 s[1] = new Array(0x04E8, 0x04E9);
 s[2] = new Array(0x04AE, 0x04AF);
 s[3] = new Array(0x0496, 0x0497);
 s[4] = new Array(0x04A2, 0x04A3);
 s[5] = new Array(0x04BA, 0x04BB);
 obj = document.getElementById('text');
 if(!obj) return;
 var value = obj.innerHTML;
 var code = "";

 code = get_code(value); 
 obj = document.getElementById('code');
 if(obj) obj.innerHTML = code;

 var match = 'no';
 match = wsearch(get_code(value));
 obj = document.getElementById('match_d');
 if(obj){
  if(match == 'no') obj.innerHTML = get_stamp(keywords.unknown);
  else obj.innerHTML = get_stamp(keywords.known);
 }
 obj = document.getElementById('add_d');
 if(obj){
  if(match == 'no'){
   text = "";
   text += "<div id=add style=\"background: #ad1; border: red 1px solid; color: blue;\" ";
   text += "onmouseover=\"this.style.color='#0af';\" ";
   text += "onmouseout=\"this.style.color='blue';\" ";
   text += "onclick=\"insert();\">" + get_stamp(keywords.insert) + "</div>";
   obj.innerHTML = text;
  }else obj.innerHTML = "";
 }
 alphabet_sorting();
}


function sort(){
 sorting(N);
 for(i = 0; i < N; i++){
  word[i] = print_word(coding[i], '');
 }
 cut();
}

function cut(n){
  "nothing to do"; 
}

function sorting(n){
 var tmp = "";
 var text = "";
 if( n == 1) return;
 for(var i = 0; i < n - 1; i++){
  if(replace(coding[i], coding[i + 1]) == "y"){
   tmp = coding[i];
   coding[i] = coding[i + 1]; 
   coding[i + 1] = tmp;
   tmp = verify[i];
   verify[i] = verify[i + 1]; 
   verify[i + 1] = tmp;
  }
 }
 if(n > 2) sorting(n - 1);
 return;
}

function replace(a, b){
 var s = new Array();
 for(i = 0; i < 6; i++){
  s[i] = new Array();
  s[i][0] = 0x0410 + i
  s[i][1] = 0x0430 + i;
 }
 s[6] = new Array(0x0401, 0x0451);
 for(i = 7; i < 33; i++){
  s[i] = new Array();
  s[i][0] = 0x0410 + i - 1;
  s[i][1] = 0x0430 + i - 1;
 }
 s[33] = new Array(0x04D8, 0x04D9);
 s[34] = new Array(0x04E8, 0x04E9);
 s[35] = new Array(0x04AE, 0x04AF);
 s[36] = new Array(0x0496, 0x0497);
 s[37] = new Array(0x04A2, 0x04A3);
 s[38] = new Array(0x04BA, 0x04BB);
 c = 39;

 if(a.length  == 0){ return "n"; }
 if(b.length  == 0){ return "y"; }

 ia = -1; sa = a.substring(0, 4);
 for(i = 0; i < c; i++){ if(sa == get_hex(s[i][1])){ ia = i; break; } }
 al = a.substring(4, a.length);
// alert("a: " + print_word(sa, '') + "(" + ia + ") "+ print_word(al, ''));
 
 ib = -1; sb = b.substring(0, 4);
 for(i = 0; i < c; i++){ if(sb == get_hex(s[i][1])){ ib = i; break; } }
 bl = b.substring(4, b.length);

 if(ia > ib){
  return "y";
 }
 if(ia < ib){
  return "n";
 }

 ret = replace(al, bl);
 return ret;
}

function asort(){
 if( sorted == 'true') return;
 for(var i = M; i > 1; i--){
  for(var j = 0; j < i - 1; j++){
   if(eval(index[alphabetic_order[j]]) > eval(index[alphabetic_order[j + 1]])){
    tmp = alphabetic_order[j];
    alphabetic_order[j] = alphabetic_order[j + 1];
    alphabetic_order[j + 1] = tmp;
   }else if(eval(index[alphabetic_order[j]]) == eval(index[alphabetic_order[j + 1]])){
    lenu = (coding[alphabetic_order[j]]).length;
    iu = gen_ind((coding[alphabetic_order[j]]).substring(glen * 4, lenu));
    lend = (coding[alphabetic_order[j + 1]]).length;
    id = gen_ind((coding[alphabetic_order[j + 1]]).substring(glen * 4, lend));
    if(iu > id){
     tmp = alphabetic_order[j];
     alphabetic_order[j] = alphabetic_order[j + 1];
     alphabetic_order[j + 1] = tmp;
    } 
   }
  }
 }
 sorted = 'true';
 return;
}

function compa(){
 var i = 0;
 while(i < M - 1){
  cur = eval(i + 1);
  if(eval(index[alphabetic_order[i]]) == eval(index[alphabetic_order[cur]])){
   if(coding[alphabetic_order[i]] == coding[alphabetic_order[cur]]){
    frequency[alphabetic_order[i]] += frequency[alphabetic_order[cur]];
    coding[alphabetic_order[cur]] = "";
    frequency[alphabetic_order[cur]] = 0;
    verify[alphabetic_order[cur]] = "";
    index[alphabetic_order[cur]] = 0;
    for(var j = cur; j < M - 1; j++) alphabetic_order[j] = alphabetic_order[eval(j + 1)];
    M--;
   }else i++;
  }else i++;
 }
 text = "";
}

function wsearch(code){ // 0
 if(sorted == 'false') asort(); // 1
 var indx = gen_ind(code);
// alert("code " + code + "\n" + "index " + indx);
 m = 0; mi = 1; md = 1;
 while(mi < M){ m++; mi *= 2;} // 1
 md = mi;
 if(mi > 1){ md /= 2; mi /= 2; } // 1
 if(md > 1){ md /= 2; } // 1

 do{ // 1
  cur = index[alphabetic_order[mi]];
  if(mi >= M) mi -= md; // 2
  else{ // 2
   if(cur == indx){ // 3
    if(coding[alphabetic_order[mi]] == code) return mi; // 4
    else{ // 4
     while(mi > 0){ // 5
      if(index[alphabetic_order[mi - 1]] == indx) mi--; // 6
      else break; // 6
     } // 5
     while(index[alphabetic_order[mi]] == indx){ // 5
      if(coding[alphabetic_order[mi]] == code) return mi; // 6
      else mi++; // 6
      if(mi >= M) return 'no'; // 6
     } // 5
     return 'no';
    } // 4
   } // 3
   else if(cur > indx) mi -= md; // 3
   else if(cur < indx) mi += md; // 3
  } // 2
  if(md < 1){ // 2
   if(mi == 0.5){ // 3
    cur = index[alphabetic_order[0]];
    if(cur == indx){ // 4
     mi = 0;
     while(index[alphabetic_order[mi]] == indx){ // 5
      if(coding[alphabetic_order[mi]] == code) return mi; // 6
      else mi++; // 6
      if(mi >= M) return 'no'; // 6
     } // 5
     return 'no';
    } // 4
   } // 3
   break;
  } // 2
  md /= 2;
 }while(md > 0); // 1
 return "no";
} // 0

function searchin(code, link){
 var indx = gen_ind(code);
 m = 0; mi = 1; md = 1;
 while(mi < count_founded){ m++; mi *= 2;}
 md = mi;
 if(mi > 1){ md /= 2; mi /= 2; }
 if(md > 1){ md /= 2; }

 var isin = "no";
 do{ // 0
  if(mi >= count_founded) mi -= md; // 1
  else{ // 1
   cur = index_founded[founded_alphabetic[mi]];
   if(cur == indx){ // 2
    if(coding_founded[founded_alphabetic[mi]] == code){ isin = 'yes'; md = 0; break; }// 3
    else{ // 3
     while(mi > 0){ // 4
      if(index_founded[founded_alphabetic[mi - 1]] == indx) mi--; // 5
      else break; // 5
     } // 4
     while(index_founded[founded_alphabetic[mi]] == indx){ // 4
      if(coding_founded[founded_alphabetic[mi]] == code){ isin = 'yes'; md = 0; break; } // 5
      else mi++; // 5
      if(mi >= count_founded){ isin = 'no'; md = 0; break; } // 5
     } // 4
     if(md == 0) break; // 4
     isin = 'no'; md = 0; break;
    } // 3
   } // 2
   else if(cur > indx) mi -= md; // 2
   else if(cur < indx) mi += md; // 2
  } // 1
  if(md < 1){ // 1
   if(mi == 0.5){ // 2
    mi = 0; cur = index_founded[founded_alphabetic[mi]];
    if(cur == indx){ // 3
     if(coding_founded[founded_alphabetic[mi]] == code){ isin = 'yes'; md = 0; break; }// 4
     else{ // 4
      while(index_founded[founded_alphabetic[mi]] == indx){ // 5
       if(coding_founded[founded_alphabetic[mi]] == code){ isin = 'yes'; md = 0; break; } // 6
       else mi++; // 6
       if(mi >= count_founded){ isin = 'no'; md = 0; break; } // 6
      } // 5
      if(md == 0) break; // 5
      isin = 'no'; md = 0; break;
     } // 4
    } // 3
   } // 2
   isin = 'no'; md = 0; break;
  } // 1
  md /= 2;
 }while(md > 0); // 0
 if(isin == 'yes'){
  k = founded_alphabetic[mi];
  frequency_founded[k]++;
  founded_links[k][founded_links_count[k]] = link;
  founded_links_count[k]++;
  return;
 }
 if(isin == 'no'){
  indict = "no";
  k = count_founded;
  founded_links[k] = new Array();
  founded_links[k][0] = link;
  founded_links_count[k] = 1;
  indict = wsearch(code);
  if(indict == 'no'){
   coding_founded[k] = code;
   word_founded[k] = print_word(code, '');
   index_founded[k] = indx;
   frequency_founded[k] = 1;
   verify_founded[k] = 'no';
   indict_founded[k] = indict;
  }else{
   coding_founded[k] = code;
   word_founded[k] = print_word(code, '');
   index_founded[k] = indx;
   frequency_founded[k] = eval(frequency[alphabetic_order[indict]]) + 1;
   verify_founded[k] = verify[alphabetic_order[indict]];
   indict_founded[k] = indict;
  }
  founded_alphabetic[k] = count_founded;
  count_founded++;
  for(var i = count_founded - 1; i > 0; i--){
   if(eval(index_founded[founded_alphabetic[i]]) < eval(index_founded[founded_alphabetic[i - 1]])){
    tmp = founded_alphabetic[i];
    founded_alphabetic[i] = founded_alphabetic[i - 1];
    founded_alphabetic[i - 1] = tmp;
   }else if(eval(index_founded[founded_alphabetic[i]]) == eval(index_founded[founded_alphabetic[i - 1]])){
    lenu = (coding_founded[founded_alphabetic[i]]).length;
    iu = gen_ind((coding_founded[founded_alphabetic[i]]).substring(glen * 4, lenu));
    lend = (coding_founded[founded_alphabetic[i - 1]]).length;
    id = gen_ind((coding_founded[founded_alphabetic[i - 1]]).substring(glen * 4, lend));
    if(iu < id){ // 3
     tmp = founded_alphabetic[i];
     founded_alphabetic[i] = founded_alphabetic[i - 1];
     founded_alphabetic[i - 1] = tmp;
    }else break; // 3
   }else break;
  }
  return;
 }
 
 return;
}

function lex(){
 keywords = settings.keywords.orphography;
 var obj = document.getElementById('show');
 if(!obj) return;
 
 var text = "";
 text += "<center><h3>" + get_stamp(keywords.title) + "</h3></center>";
  text += "<center><div style=\"background: #00a; width: 100px;\" onclick=\"cmp(); go();\"><center>" + get_stamp(keywords.go) + "</center></div></center>";
 
var m = 100;
for(var k = 0; k < m; k++){
 var t = "";
 t = find_cmp();
 if(t != ""){
  text += "<br>" + t + "<br>";
 }
}

 
/*
/// split();
 text = "";
 
 text += "count " + part_count + "<br>";
 for(i = 0; i < part_count; i++){
  k = sorting_part[i];
  text += "" + i + " " + parting[k];
  text += " " + part_length[k];
  text += " " + part_index[k];
  p = part_array_count[k];
  text += " " + p;
  text += " " + "{";
  for(u = 0; u < p; u++){
   text += "[" + part_array[k][p][0];
   text += ", " + part_array[k][p][1] + "]";
  }
  text += "}" + "<br>";;
// + " " + part_frequency[k] + " " + "<br>";
 }
*/
/*
 z = word[alphabetic_order[3]]; ttt(z, 0); alert("");
 z = word[alphabetic_order[8]]; ttt(z, 0); alert("");
 z = word[alphabetic_order[38]]; ttt(z, 0); alert(""); 
 z = word[alphabetic_order[83]]; ttt(z, 0); alert("");
 for(i = 4; i < 8; i++){ z = word[alphabetic_order[i]]; ttt(z, 0); alert(""); }
 for(i = 9; i < 12; i++){ z = word[alphabetic_order[i]]; ttt(z, 0); alert(""); }
*/
 obj.innerHTML = text;
 butt(3);
}

var analyzed = new Array();
var analyzed_count = 0;
var point = 0;

function find_cmp(){
 ret = "";
 do{
  i = Math.random().toString().replace(/\./g,"");
  x = word[alphabetic_order[i % M]];
  j = Math.random().toString().replace(/\./g,"");
  y = word[alphabetic_order[j % M]];
  ret = cword(x, y, 'max');
 }while(ret == '');
 return ret;
}

function go(){
 return;
 i = Math.random().toString().replace(/\./g,"");
 z = word[alphabetic_order[i % M]];
 ttt(z, 1);
/*
 point = (point + 1) % M;
 z = word[alphabetic_order[point]];
 for(i = 0; i < analyzed_count; i++){
  if(analyzed[i] == z){ setTimeout("go()", 100); return; }
 }
 analyzed[analyzed_count] = z;
 analyzed_count++;
 ttt(z, 1);
*/
// alert(z);
 while(check_count > 0){ // 1
  next = 'no';
  for(i = 0; i < analyzed_count; i++){ // 2
   if(checka[check_count - 1] == analyzed[i]){ // 3
    check_count--; next = 'yes';
    break;
   } // 3
  } // 2
  if(next == 'no'){ // 2
   z = checka[check_count - 1];
   analyzed[analyzed_count] = z;
   analyzed_count++;
   ttt(z, 1);
   check_count--;
  } // 2
 } // 1

// verify_sort();
 show_part();
// clean();
}

var parting = new Array();
var part_coding = new Array();
var part_frequency = new Array();
var part_length = new Array();
var part_verify = new Array();
var part_index = new Array();
var part_count = 0;
var sorting_part = new Array();

var part_array = new Array();
var part_array_count = new Array();

function verify_sort(){
 for(i = 0; i < part_count; i++){
  for(j = part_count - 1; j > i; j++){
   if(eval(part_verify[sorting_part[j]]) < eval(part_verify[sorting_part[j - 1]])){
    tmp = sorting_part[j];
    sorting_part[j] = sorting_part[j - 1];
    sorting_part[j - 1] = tmp;
   }
  }
 }
}

function show_part(){
 alert("show_part();");
 var text = "";
 text += "<center><div style=\"background: #00a; width: 100px;\" onclick=\"go();\"><center>" + get_stamp(keywords.go) + "</center></div></center>"
 text += "<center>";
 text += "<div style=\"font-size: 13px;\">";
 text += "count: " + part_count + "<br><br>";
 for(i = 0; i < part_count; i++){
  if(i != 0) text += "<br>";
  k = sorting_part[i];
  text += "" + i + " [" + k + "] " + parting[k] + " (" + part_verify[k] + ")<br>";
  text += part_length[k] + " " + part_index[k] + "<br>";
  for(b = 0; b < part_array_count[k]; b++){
   if(b != 0) text += "<br>";
   text += "(" + part_array[k][b][2] + ") {'" + part_array[k][b][0] + "', '" + part_array[k][b][1] + "'}";
  }
  text += "<br>";
 }
 text += "</div>";
 text += "</center>";
 var obj = document.getElementById('show');
 if(obj) obj.innerHTML = text;
}

function clean(){
 min = part_verify[0];
 ind = 0;
 for(i = 0; i < part_count; i++){
  if(part_verify[i] < min){ ind = i; min = part_verify[ind]; }
 }
 for(i = 0; i < part_array_count[ind]; i++){
  if(part_array[ind][i][2] == -2){
   w = part_array[ind][i][0] + parting[ind] + part_array[ind][i][1];
   alert("w " + w);
   wc = get_code(w);
   alert("wc " + wc);
   if(wsearch(wc) != 'no') part_array[ind][i][2] += 1;
   else part_array[ind][i][2] -= 1;  
  }
 }
 
 if(part_verify[ind] <= -5) alert("rem " + ind); 
 
}

function psearch(p){
 m = 0; mi = 1; md = 1;
 while(mi < part_count){ m++; mi *= 2;}
 md = mi;
 if(mi > 1){ md /= 2; mi /= 2; }
 if(md > 1){ md /= 2; }

 do{
  cur = part_index[sorting_part[mi]];
  if(mi >= part_count) mi -= md;
  else{
   if(cur == p) return mi;
   else if(cur > p) mi -= md;
   else if(cur < p) mi += md;
  }
  if(md < 1){
   if(mi == 0.5){
     cur = part_index[sorting_part[0]];
     if(cur == p) return 0;
   }
   break;
  }
  md /= 2;
 }while(md > 0);
 return "no";
}

var checka = new Array();
var check_count = 0;
var roots = new Array();
var root_count = 0;
var prefs = new Array();
var pref_count = 0;
var sufs = new Array();
var suf_count = 0;


function inject(w, left, right, v){
// alert("inject('" + w + "', '" + left + "', '" + right + "', '" + v + "');");
 if(w == '') return;
 wc = get_code(w);
 wi = gen_ind(wc);
 m = psearch(wi);
 go_ = 'false';
 if(m != 'no') if(part_coding[sorting_part[m]] == wc) go_ = 'true';
 if(go_ == 'true'){
  k = sorting_part[m];
  b = part_array_count[k];
  part_verify[k] += v;
  part_array[k][b] = new Array();
  part_array[k][b][0] = left;
  part_array[k][b][1] = right;
  part_array[k][b][2] = v;
  part_array_count[k]++;
  for(var q = 0; q < part_array_count[k] - 1; q++){
   if(part_array[k][q][0] == left){
/*
    if(part_array[k][q][1] != '' && wsearch(get_code(part_array[k][q][1])) != 'no'){
     checka[check_count] = part_array[k][q][1];
     check_count++;
     part_array[k][q][2]++; part_verify[k]++;
    }
*/
//    }else{ part_array[k][q][2]--; part_verify[k]--; }
    if(right != '' && wsearch(get_code(right)) != 'no'){
     pm = psearch(gen_ind(get_code(right)));
     if(pm != 'no'){
      pm = 'no';
      for(i = 0; i < part_array_count[pm]; i++){
       if(part_array[i][0] == '' && part_array[i][1] == ''){ pm = 'yes'; break; }
      }
     }
     if(pm == 'no'){
      checka[check_count] = right;
      check_count++;
     }
     part_array[k][b][2]++; part_verify[k]++;
    }
//    }else{ part_array[k][b][2]--; part_verify[k]--; } 
/*
    if(left != '' && wsearch(get_code(left)) != 'no'){
     checka[check_count] = left;
     check_count++;
     part_array[k][q][2]++; part_verify[k]++;
     part_array[k][b][2]++; part_verify[k]++;
    }else{
     part_array[k][q][2]--; part_verify[k]--;
     part_array[k][b][2]--; part_verify[k]--;
    }
*/
//    break;
   }
   if(part_array[k][q][1] == right){
/*
    if(part_array[k][q][0] != '' && wsearch(get_code(part_array[k][q][0])) != 'no'){
     checka[check_count] = part_array[k][q][0];
     check_count++;
     part_array[k][q][2]++; part_verify[k]++;
    }
*/
//    }else{ part_array[k][q][2]--; part_verify[k]--; } 
    if(left != '' && wsearch(get_code(left)) != 'no'){
     pm = psearch(gen_ind(get_code(left)));
     if(pm != 'no'){
      pm = 'no';
      for(i = 0; i < part_array_count[pm]; i++){
       if(part_array[i][0] == '' && part_array[i][1] == ''){ pm = 'yes'; break; }
      }
     }
     if(pm == 'no'){
      checka[check_count] = left;
      check_count++;
     }
     part_array[k][b][2]++; part_verify[k]++;
    }
//    }else{ part_array[k][b][2]++; part_verify[k]--; }
/*
    if(right != '' && wsearch(get_code(right)) != 'no'){
     checka[check_count] = right;
     check_count++;
     part_array[k][q][2]++; part_verify[k]++;
     part_array[k][b][2]++; part_verify[k]++;
    }else{
     part_array[k][q][2]--; part_verify[k]--;
     part_array[k][b][2]--; part_verify[k]--;
    }
*/
   }
  }
  q = 0; while( q <= part_array_count[k] - 1){
   if(part_array[k][q][2] <= -5){
    for(qq = q; qq < part_array_count[k] - 1; qq++){
     part_verify[k] -= part_array[k][q][2];
     part_array[k][qq][0] = part_array[k][qq + 1][0];
     part_array[k][qq][1] = part_array[k][qq + 1][1];
     part_array[k][qq][2] = part_array[k][qq + 1][2];
    }
    part_array_count[k]--; 
   }else q++;
  }
/*
  if(b == 1) inject(w, '', '', -2);
*/
/*
  if(b == 2){
   for(var i = 0; i < b; i++){
    vi = part_array[k][i][2];
    zi = part_array[k][i][0]; if(zi != '') ttt(zi, vi);
    zi = part_array[k][i][1]; if(zi != '') ttt(zi, vi);
   }
  }
*/
  part_verify[k]++;
 }else{
  k = part_count;
  parting[k] = w;
  part_length[k] = w.length;
  part_coding[k] = wc;
  part_index[k] = wi;
  part_array_count[k] = 0;
  b = part_array_count[k];
  part_array[k] = new Array();
  part_array[k][b] = new Array();
  part_array[k][b][0] = left;
  part_array[k][b][1] = right;
  vv = 0
  if(left != '' && wsearch(get_code(left)) != 'no'){
   pm = psearch(gen_ind(get_code(left)));
   if(pm != 'no'){
    pm = 'no';
    for(i = 0; i < part_array_count[pm]; i++){
     if(part_array[i][0] == '' && part_array[i][1] == ''){ pm = 'yes'; break; }
    }
   }
   if(pm == 'no'){
    checka[check_count] = left;
    check_count++;
   }
   vv++;
  }
  if(right != '' && wsearch(get_code(right)) != 'no'){
   pm = psearch(gen_ind(get_code(right)));
   if(pm != 'no'){
    pm = 'no';
    for(i = 0; i < part_array_count[pm]; i++){
     if(part_array[i][0] == '' && part_array[i][1] == ''){ pm = 'yes'; break; }
    }
   }
   if(pm == 'no'){
    checka[check_count] = right;
    check_count++;
   }
   vv++;
  }
  part_verify[k] = v + vv;
  part_array[k][b][2] = v + vv;
  part_array_count[k]++;
  sorting_part[k] = k;
  part_count++;
  for(i = part_count - 1; i > 0; i--){
   if(eval(part_index[sorting_part[i]]) < eval(part_index[sorting_part[i - 1]])){
    tmp = sorting_part[i];
    sorting_part[i] = sorting_part[i - 1];
    sorting_part[i - 1] = tmp;
   }else break;
  }
 }
/*
  var text = "";
  text += "" + k + " " + parting[k] + " (" + part_verify[k] + ")\n";
  text += part_length[k] + " " + part_index[k] + "\n";
  for(b = 0; b < part_array_count[k]; b++){
   if(b != 0) text += "\n";
   text += "(" + part_array[k][b][2] + ") {'" + part_array[k][b][0] + "', '" + part_array[k][b][1] + "'}";
  }
  texta = text;
*/
//  show_part();  
//  alert(texta);
}


function ttt(tw, v){
 alert("ttt('" + tw + "', '" + v + "');");
 if(tw == '') return;
 pm = psearch(gen_ind(get_code(tw)));
 if(pm != 'no'){
  for(i = 0; i < part_array_count[pm]; i++){
   if(part_array[i][0] == '' && part_array[i][1] == '') return;
  }
 }
 len = tw.length;
 for(var l = 1; l < len; l++)
  inject(tw.substring(0, l), '', tw.substring(l, len), v-1);
 for(var l = 1; l < len; l++)
  inject(tw.substring(len - l, len), tw.substring(0, len - l), '', v-1);
 inject(tw, '', '', v);
}




function split(){ // 0
 for(var i = 20; i < 40; i++){ // 1
  z = alphabetic_order[i];
  len = word[z].length;
  for(var l = 1; l <= len; l++){ // 2
   for(var b = 0; b <= len - l; b++){ //3
    k = part_count;
    parting[k] = word[z].substring(b, b + l);
    part_length[k] = l;
    part_coding[k] = get_code(parting[k]);
    part_index[k] = gen_ind(part_coding[k]);
//    part_frequency[k] = frequency[z];
    part_frequency[k] = 1;
    sorting_part[k] = k;
    part_count++;
    for(j = part_count - 1; j > 0; j--){ // 4
     un = eval(part_index[sorting_part[j - 1]]);
     dn = eval(part_index[sorting_part[j]]);
     if(un > dn){ // 5
//      alert("replace " + parting[sorting_part[j - 1]] + " " + parting[sorting_part[j]]);
      tmp = sorting_part[j];
      sorting_part[j] = sorting_part[j - 1];
      sorting_part[j - 1] = tmp;
     }else if(un == dn){ // 5
//      alert("glue " + parting[sorting_part[j - 1]] + " " + parting[sorting_part[j]]);
      part_frequency[sorting_part[j - 1]] += part_frequency[sorting_part[j]];
      for(s = j; s < part_count - 1; s++) sorting_part[s] = sorting_part[s + 1];
      part_count--;
      break;
     }else break; // 5
    } // 4
   } // 3
  } // 2
 } // 1

 while(i <= part_count - 1){ // 1
  if(eval(part_frequency[sorting_part[i]]) < 2){ // 2
   for(j = i; j < part_count - 1; j++) sorting_part[j] = sorting_part[j + 1];
   part_count--;
  }else i++; // 2
 } // 1
 for(i = 0; i < part_count - 1; i++){ // 1
  for(j = 0; j < part_count - 1 - i; j++){ // 2
   un = eval(part_frequency[sorting_part[j]]);
   dn = eval(part_frequency[sorting_part[j + 1]]);
   if(un < dn){ // 3
    tmp = sorting_part[j];
    sorting_part[j] = sorting_part[j + 1];
    sorting_part[j + 1] = tmp;
   } // 3
  } // 2
 } // 1
 i = 0; while(eval(part_frequency[sorting_part[i]]) > 1) i++;
 part_count = i ;

 for(i = 0; i < part_count - 1; i++){ // 1
  for(j = 0; j < part_count - 1 - i; j++){ // 2
   un = eval(part_length[sorting_part[j]]);
   dn = eval(part_length[sorting_part[j + 1]]);
   if(un < dn){ // 3
    tmp = sorting_part[j];
    sorting_part[j] = sorting_part[j + 1];
    sorting_part[j + 1] = tmp;
   } // 3
  } // 2
 } // 1

} // 0

function items(name){
 var list = settings.items.list;
 for(i = 0; i < settings.items.count; i++){
  if(list[i].name == name) return list[i].include;
 }
 return 'not exist';
}

function cword(first, second, rate){
// alert(first + "\n" + second);
 if(rate != 'max') return "";
 if(first == "") return "";
 if(second == "") return "";
 if(first == second) return "";
 len = first.length;
// alert(len);
 for(l = len; l > 1; l--){ // 1
  for(i = 0; i + l <= len; i++){ // 2
   p = first.substr(i, l);
//   alert("[" + first + "].substr(" + i + ", " + l + ")\n" + p);
   rp = second.search(p)
   if(rp != -1){ // 3
    text = "";
    pref = ""; suff = ""; root = "";
    h1 = first.substring(0, i);
    h2 = second.substring(0, rp);
    b1 = first.substring(i, i + l);
    b2 = second.substring(rp, rp + l);
    t1 = first.substring(i + l, first.length);
    t2 = second.substring(rp + l, second.length);
    if(h1 == '' && t1 == ''){
     root = 'root1';
     pref = h2; suff = t2; 
    }else if(h2 == '' && t2 == ''){
     root = 'root2';
     pref = h1; suff = t1;
    }
    else if(h1 == '' && h2 == '') pref = b1;
    else if(t1 == '' && t2 == '') suff = b1;
    
    
    if(pref != '') text += "<span style=\"color: blue;\">prefix [" + pref + "]</span>\n ";
    if(root != '') text += "<span style=\"color: green;\">root [" + b1 + "]</span>\n ";
    if(suff != '') text += "<span style=\"color: yellow;\">suffix [" + suff + "]</span>\n ";
    
    text += "\n <br>";
    text += "[" + h1 + "]" + b1 + "[" + t1 + "]";
    text += " - ";
    text += "[" + h2 + "]" + b2 + "[" + t2 + "]";
  
    if(root == 'root1'){
     if(h2 == ''){
      text += "\n <br> var : ";
      text += "[" + t2 + "]";
     }else if(t2 == ''){
      text += "\n <br> var : ";
      text += "[" + h2 + "]";
     }else{
      text += "\n <br> var1 : ";
      text += "[" + h2 + "]" + b2;
      text += "\n <br> var2 : ";
      text += b2 + "[" + t2 + "]";
     }
    }else if(root == 'root2'){ 
     if(h1 == ''){
      text += "\n <br> var : ";
      text += "[" + t1 + "]";
     }else if(t1 == ''){
      text += "\n <br> var : ";
      text += "[" + h1 + "]";
     }else{
      text += "\n <br> var1 : ";
      text += "[" + h1 + "]" + b1;
      text += "\n <br> var2 : ";
      text += b1 + "[" + t1 + "]";
     }
    }else if(pref != ''){
     text += "\n <br> var1 : ";
     text += "[" + t1 + "]";
     text += "\n <br> var2 : ";
     text += "[" + t2 + "]";
    }else if(suff != ''){
     text += "\n <br> var1 : ";
     text += "[" + h1 + "]";
     text += "\n <br> var2 : ";
     text += "[" + h2 + "]";
    }else{
     text += "\n <br> var1 : ";
     text += "[" + h1 + "]" + b1 + "[" + t2 + "]";
     text += "\n <br> var2 : ";
     text += "[" + h2 + "]" + b2 + "[" + t1 + "]";
    }   
    text += "<br>";

    return text;
   } // 3
  } // 2
 } // 1
 return "";
}