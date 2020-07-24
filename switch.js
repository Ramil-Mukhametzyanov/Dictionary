Llang = "TT";
function Switch(){
 if(Llang == "BA"){
  $("#interface_BA").hide();
  $("#interface_TT").show();
  L('TT');
  Llang = "TT";
 }else if(Llang == "TT"){
  $("#interface_TT").hide();
  $("#interface_BA").show();
  L('BA');
  Llang = "BA";
 }
}