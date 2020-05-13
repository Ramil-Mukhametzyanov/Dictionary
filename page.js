 var Status = {'TT': 0, 'RU': 0};
 function Change(lang){
//  console.log('Status:' + Status[lang] + "\n");
  var w = document.getElementById('txt_'+lang).value
  $("#uni_"+lang)[0].innerHTML = anaLyze(w, lang);
  resize(lang);
  if(Status[lang]) setTimeout("Change('" + lang + "')",100);
 }

$(document).ready(function(){
 

  
 $("#txt_TT").focus(function(){
  $(this).css("background-color","#FFFF00");
  Status['TT'] = 1;
  Change('TT');
  $("#key_RU").hide();
  $("#key_TT").show();
  })

 $("#txt_TT").blur(function(){
  $(this).css("background-color","#AAAA00");
  Status['TT'] = 0;
  Langs['TT'].cursor = $("#txt_TT").prop("selectionStart");
  console.log("cursor: " + Langs['TT'].cursor);
 });

 $("#txt_RU").focus(function(){
  $(this).css("background-color","#00FFFF");
  Status['RU'] = 1;
  Change('RU');
  $("#key_TT").hide();
  $("#key_RU").show();
  })

 $("#txt_RU").blur(function(){
  $(this).css("background-color","#00AAAA");
  Status['RU'] = 0;
  Langs['RU'].cursor = $("#txt_RU").prop("selectionStart");
  console.log("cursor: " + Langs['RU'].cursor);
 });


 $("#info").hide();
 $("#key_TT").hide()
 showAlphabet("TT");
 $("#key_TT").mouseover(function(){
  $("#txt_TT").css("background-color","#FFFF00");
  $("#txt_RU").css("background-color","#00AAAA");
 });


 $("#key_RU").hide();
 showAlphabet("RU");
 $("#key_RU").mouseover(function(){
  $("#txt_RU").css("background-color","#00FFFF");
  $("#txt_TT").css("background-color","#AAAA00");
 });
  

 
});
 var Edit = {'TT': 0, 'RU': 1};
 function toggle(l){
  for(i in Edit){
   if(i != l) $("#key_"+i).hide();
  }
  if(Edit[l] == 1){
   Edit[l] = 0;
   $("#txt_"+l).hide();
   $("#key_"+l).hide();
   Change(l);
  }else if(Edit[l] == 0){ 
   Edit[l] = 1;
   resize(l);
   $("#txt_"+l).show();
   $("#key_"+l).show();
   $("#info").hide();
  }else Edit[l] = 0;
 }
 var Size = {'TT': 0, 'RU': 0};
 function resize(l){
  document.getElementById('txt_'+l).style.height='auto';
  var h = document.getElementById('txt_'+l).scrollHeight;
  if(h == 0) h = Size[l];
  Size[l] = h;
  console.log('h: ' + h);
  if(h < 450) h = 450;
  document.getElementById('txt_'+l).style.height=h+"px";
 }
