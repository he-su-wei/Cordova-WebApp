let sendData = new Object();

let url = location.href;
storeAddress = url.split("?")[1];
// console.log(url);
// console.log(storeAddress);

var storeName;

function onload() {

    var ws = new WebSocket("ws://192.168.68.52:6012");

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
        storeName = JSON.parse(event.data) + "菜單";
        console.log(storeName);
    };

    ws.onclose = function(evt) {
        setPage();
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
                tmp += '<p class="more" style="margin: 0.5em 0; ">'+obj[i][3]+'</p></div></div>';
                count++;
                $('#Customer_allMenu').append(tmp);
               
            }   

        },
        error: function(data){
            console.log(data);
        }

    });

}


function setPage() {
    $('#backPage').attr('onclick','javascript:window.location.href = \"../customer-storeInfo.html?'+ storeAddress +'\"');
}