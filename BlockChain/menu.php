<?php

    // session_start();
    include("db_conn.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

    if(isset($_POST)){

        $storeName = $_POST['storeName'];

        $sql = "SELECT count, productName, price, introduction, img FROM `$storeName`";
        $result = mysqli_query($conn, $sql);

        $account = array();

        while ($row = mysqli_fetch_assoc($result)) {
            array_push($account, array($row['count'], $row['productName'], $row['price'], $row['introduction'], $row['img']));
        }

        echo json_encode($account, JSON_UNESCAPED_UNICODE);

    }
    else{
        $state = array("status" => "fail");
        echo json_encode($state, JSON_UNESCAPED_UNICODE);
    }

    
?>