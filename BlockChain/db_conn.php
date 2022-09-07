<?php
   $host = "192.168.68.52";
   $username = "zzz20002026";
   $password = "h3041723";
   $dbname = "zzz20002026";

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
