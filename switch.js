
function Switch(){ 
 Llang_index = (Llang_index + 1) % profile.length;
 Llang = profile[Llang_index];

 for(var i = 0 ; i < profile.length; i++){
  if(profile[i] == Llang){
   $("#interface_"+Llang).show();
  }else{
   $("#interface_"+profile[i]).hide();
  }
 }
 console.log(Llang);
}