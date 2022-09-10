<?php
   $host = "120.108.111.231";
   $username = "zzz20002026";
   $password = "h3o4@1723";
   $dbname = "foodchain";

   // Create connection
   $conn = new mysqli($host, $username, $password, $dbname);

   // Check connection
   if ($conn->connect_error) {
      echo "Connected fail";
   }
   else {
      // echo "Connected successfully";
   }
   
?>
