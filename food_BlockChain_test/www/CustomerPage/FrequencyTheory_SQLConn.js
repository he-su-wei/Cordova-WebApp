let sendData = new Object();

let url = location.href;
storeAddress = url.split("?")[1];
// console.log(url);
// console.log(storeAddress);

var storeName;

function onload() {

    var ws = new WebSocket("ws://120.108.111.231:6012");

    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "getStoreName";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        ws.send(storeAddress);
    };

    //取得餐廳名字
    ws.onmessage = function (event) {
        console.log(JSON.parse(event.data));
        $("#storeName").text(JSON.parse(event.data));
        storeName = JSON.parse(event.data) + "評論";
        console.log(storeName);
        conn(storeName);
    };

    ws.onclose = function(evt) {
        setPage();
    };

}

function conn(storeName){
    //查詢資料庫資料 寫到前端
    $.ajax({
        datatype: "JSON",
        type: "POST",
        url: "http://120.108.111.231/Blockchain/comment.php",
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
                
                let tmp = "<div class='container'>";
                tmp += "<div class='items-center'><img class='userImg-margin' src='../img/man.png'></div>";
                tmp += '<div class="comment-content flex-2">';
                tmp += '<p class="comment-content-name">'+obj[i][0]+'</p>';
                tmp += '<p class="comment-content-article">'+obj[i][1]+'</p>';
                tmp += '<p class="comment-content-footer"><span class="comment-content-footer-id">'+"B"+ count +'&nbsp</span>';
                tmp += '<span class="comment-content-footer-timestamp">'+obj[i][3]+'</span></p><hr/></div>';
                tmp += '<div class="items-center"><img class="upload-img" src="http://120.108.111.231/Blockchain'+obj[i][2]+'"></div></div>';
                count++;
                $('#allcomments').append(tmp);
               
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

//圖片彈跳視窗
function customizeWindowEvent() {
    var popup_window = document.getElementById("window-container");

    popup_window.style.display = "block";

    window.onclick = function close(e) {
        if (e.target == popup_window) {
            popup_window.style.display = "none";
        }
    }
}

//按下傳送按鈕函式
//將評論寫到資料庫
function insertComment() {

    var account = localStorage.name;
    // var account = "asia002";
    var comment = document.getElementById("comments").value;
    console.log(storeName);
    console.log(account);
    console.log(comment);
    console.log(uploaded_image);
    $.ajax({
        datatype: "JSON",
        type: "POST",
        url: "http://120.108.111.231/Blockchain/insertComment.php",
        data:{
            "storeName": storeName,
            "account": account,
            "comment": comment,
            "imagestring": uploaded_image
        },  
        crossDomain: true,
        cache: false,
        success: function(data){
            console.log(data);
            var obj = JSON.parse(data);
            console.log(obj);
            if(obj.status == "success"){
                getCoin();
                alert("新增成功");
                window.location.href= "./FrequencyTheory.html?" + storeAddress;
            }
            else{
                alert("新增失敗");
                window.location.href="./FrequencyTheory.html?" + storeAddress;
            }
            
        },
        error: function(data){
            console.log(data);
        }

    });

}

function getCoin(){
    var ws = new WebSocket("ws://120.108.111.231:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "asiaToken";
        sendData["Type"] = "transfer";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        // var ad = "0xDf11D1f32DAF325aa4Ce385A08c33F4D05Ab5FB9";
        // ws.send(ad);
        ws.send(localStorage.address);
    };

    ws.onmessage = function (event) {
        console.log(event.data)
        setTimeout(getbalance, 10000);
        
    };
}


function setPage() {
    $('#backPage').attr('onclick','javascript:window.location.href = \"../customer-storeInfo.html?'+ storeAddress +'\"');
}