<?php



function save($lang){
 $file = $lang.".js";
 echo $_POST["content_".$lang];
 if ($_POST["content_".$lang] == "") return;
 $m = 1;
 do{
  $e = file_exists($file." (".($m).").bak");
  $m++;
 }while($e);
 $m--;
 
 for ($x = $m - 1; $x >= 0; $x--) {
  if($x == 0){
   if (!copy($file, $file." (".($x+1).").bak")) {
      echo "error!\n";
   }
  }else{
   if (!copy($file." (".($x).").bak", $file." (".($x+1).").bak")) {
      echo "error!\n";
   }
  }
 }   

 $current = $_POST["content_".$lang];
 file_put_contents($file, $current); 
}

save('TT');
echo '<br>';
echo '<br>';
save('RU');
echo '<br>';
echo '<br>';

echo "<script>window.close()</script>";


?>