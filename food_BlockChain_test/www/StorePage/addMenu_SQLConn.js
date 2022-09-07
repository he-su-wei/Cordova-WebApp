let sendData = new Object();

var storeName;
function onload() {

    var ws = new WebSocket("ws://192.168.68.52:6012");

    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "getStoreName";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        ws.send(localStorage.address);
    };

    //取得餐廳名字
    ws.onmessage = function (event) {
        console.log(JSON.parse(event.data));
        $("#storeName").text(JSON.parse(event.data));
        storeName = JSON.parse(event.data) + "菜單";
        console.log(storeName);
    };

   
    //查詢資料庫資料 寫到前端
    $.ajax({
        datatype: "JSON",
        type: "POST",
        url: "http://192.168.68.52/BlockChain/menu.php",
        data:{
            "storeName": storeName
        }, 
        crossDomain: true,
        cache: false,
        success: function(data){
            var obj = JSON.parse(data);
            console.log(obj);
            // console.log(obj.length);

            //B 樓層記數
            let count = 1;

            for(let i=0; i<obj.length; i++) {
                
                let tmp = "<div class='product-container'>";
                tmp += '<div class="item-img"><img class="product-img" src="http://192.168.68.52/BlockChain'+obj[i][4]+'"></div>';
                tmp += '<div class="info flex-3">';
                tmp += '<div class="flex between height-20" >';
                tmp += '<p class="product-name">'+obj[i][1]+'</p>';
                tmp += '<p class="price">$'+obj[i][2]+'</p></div>';
                tmp += '<p class="more" style="margin: 0.5em 0; ">'+obj[i][3]+'</p></div>';
                tmp += '<div><button class="div-max btn" type="submit" value="'+obj[i][0]+'" onclick="delMenu(this)"><i class="far fa-trash-alt"></i></button></div></div>';
                count++;
                $('#allMenu').append(tmp);
               
            }   

        },
        error: function(data){
            console.log(data);
        }

    });

}


var uploaded_image;
//圖片預覽
function imagestring() {
    const image_input = document.querySelector("#image-input");

    image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
        console.log(uploaded_image);
    });
    reader.readAsDataURL(this.files[0]);

    // console.log(this.files[0]);
    });
}



//按下傳送按鈕函式
//將菜單寫到資料庫
function insertMenu() {

    
    var productName = document.getElementById("productName").value;
    var price = document.getElementById("price").value;
    var introduction = document.getElementById("introduction").value;
    

    // console.log(productName);
    // console.log(introduction);
    // console.log(price);
    // console.log(uploaded_image);

    $.ajax({
        datatype: "JSON",
        type: "POST",
        url: "http://192.168.68.52/BlockChain/insertMenu.php",
        data:{
            "storeName": storeName,
            "productName": productName,
            "price": price,
            "introduction": introduction,      
            "imagestring": uploaded_image
        },  
        crossDomain: true,
        cache: false,
        success: function(data){
            console.log(data);
            var obj = JSON.parse(data);
            console.log(obj);
            if(obj.status == "success"){
                alert("新增成功");
                // window.location.href= "./FrequencyTheory.html?" + storeAddress;
                window.location.reload();
            }
            else{
                alert("新增失敗");
                // window.location.href="./FrequencyTheory.html?" + storeAddress;
                window.location.reload();
            }
            
        },
        error: function(data){
            console.log(data);
        }

    });

}

// 刪除菜單
function delMenu(myObj) {

    var id = myObj.value;

    // console.log(storeName);
    // console.log(id);

    $.ajax({
        datatype: "JSON",
        type: "POST",
        url: "http://192.168.68.52/BlockChain/delMenu.php",
        data:{
            "storeName": storeName,
            "id": id
        },  
        crossDomain: true,
        cache: false,
        success: function(data){
            console.log(data);
            var obj = JSON.parse(data);
            console.log(obj);
            if(obj.status == "success"){
                alert("刪除成功");
                // window.location.href= "./FrequencyTheory.html?" + storeAddress;
                window.location.reload();
            }
            else if(obj.status == "fail"){
                alert("刪除失敗");
                // window.location.href="./FrequencyTheory.html?" + storeAddress;
                window.location.reload();
            }
            else if(obj.status == "firstFail"){
                alert("刪除失敗，在試一次");
                // window.location.href="./FrequencyTheory.html?" + storeAddress;
                window.location.reload();
            }
            else{
                alert("刪除失敗");
                // window.location.href="./FrequencyTheory.html?" + storeAddress;
                window.location.reload();
            }
            
        },
        error: function(data){
            console.log(data);
        }

    });

}
