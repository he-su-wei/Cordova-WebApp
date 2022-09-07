<?php

    include("db_conn.php");

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Origin, Methods, Content-Type");

    // if(isset($_POST)){

        $storeName = $_POST['storeName'];
        $productName = $_POST['productName'];
        $price = $_POST['price'];
        $introduction = $_POST['introduction'];

        $base64_image_content = trim($_POST['imagestring']);

        //測試圖片base64
        // $base64_image_content = "data:image/png;base64,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";
        
        $path = "menu_photos";
        //呼叫函式
        base64_image_content($storeName, $productName, $price, $introduction, $base64_image_content, $path, $conn);

        //base64格式編碼轉換為圖片並儲存對應資料夾
        function base64_image_content($storeName, $productName, $price, $introduction, $base64_image_content, $path, $conn){
            //匹配出圖片的格式
            if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){

                $type = $result[2];
                $new_file = $path."/".date('Ymd',time())."/";

                if(!file_exists($new_file)){
                    //檢查是否有該資料夾，如果沒有就建立，並給予最高許可權
                    mkdir($new_file, 0700);
                }
                $new_file = $new_file.time().".{$type}";
                if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
                    
                    //圖片路徑
                    $image = '/'.$new_file;
                    //路徑儲存到資料庫
                    $sql = "INSERT INTO $storeName (productName, price, introduction, img) VALUES ('$productName', '$price', '$introduction', '$image')";
                    // echo $sql;

                    if(mysqli_query($conn, $sql)){
                        $state = array("status" => "success");
                        echo json_encode($state, JSON_UNESCAPED_UNICODE);
                        // echo "success";
                    }
                    else{
                        $state = array("status" => "fail");
                        echo json_encode($state, JSON_UNESCAPED_UNICODE);
                        // echo "fail";
                    }
                }
                else{
                    $state = array("status" => "fail");
                    echo json_encode($state, JSON_UNESCAPED_UNICODE);
                }
            }
        }

    // }
    // else{
    //     $state = array("status" => "conn fail");
    //     echo json_encode($state, JSON_UNESCAPED_UNICODE);
    // }

?>