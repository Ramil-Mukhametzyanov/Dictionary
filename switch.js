function Switch(lang){
if(lang == "TT"){
 $("#interface_BA").hide();
 $("#interface_TT").show();
 L('TT');
}else if(lang == "BA"){
 $("#interface_TT").hide();
 $("#interface_BA").show();
 L('BA');
}

}