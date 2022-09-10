<?php

    // session_start();
    include("db_conn.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

    if(isset($_POST)){

        $storeName = $_POST['storeName'];
        $id = $_POST['id'];

        $sqls ="SELECT img FROM `$storeName` WHERE count='$id'";
        $sql = "DELETE FROM `$storeName` WHERE count='$id'";
        $result = mysqli_query($conn, $sqls);


        if ($result) {
            // mysqli_num_rows方法可以回傳我們結果總共有幾筆資料
            if (mysqli_num_rows($result)>0) {
                // 取得大於0代表有資料
                // while迴圈會根據資料數量，決定跑的次數
                // mysqli_fetch_assoc方法可取得一筆值
                while ($row = mysqli_fetch_assoc($result)) {

                    $datas = $row['img'];
                    //刪除資料夾內圖片
                    $file = ".".$datas;
                    // print_r($file);
                    if (!unlink($file)) {
                        $state = array("status" => "fail");
                        echo json_encode($state, JSON_UNESCAPED_UNICODE);
                    }
                    else {
                        $delResult = mysqli_query($conn, $sql);
                        if ($delResult) {
                            $state = array("status" => "success");
                            echo json_encode($state, JSON_UNESCAPED_UNICODE);
                        }
                    }
                }
            }
            // 釋放資料庫查到的記憶體
            mysqli_free_result($result);
        }
        else {
            $state = array("status" => "firstFail");
            echo json_encode($state, JSON_UNESCAPED_UNICODE);
        }
    }
    else{
        $state = array("status" => "fail");
        echo json_encode($state, JSON_UNESCAPED_UNICODE);
    }

    
?>