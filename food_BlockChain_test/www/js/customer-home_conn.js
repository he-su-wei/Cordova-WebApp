var datas = [];
let sendData = new Object();
function onload(){
    var ws = new WebSocket("ws://192.168.0.123:6012");
    
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "AllStore";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
    };
    ws.onmessage = function (event) {
        datas.push(JSON.parse(event.data));
        console.log(datas);
    };
    ws.onclose = function(evt) {
        setInfo();
    };
}

function setInfo(){
    for(let i=0;i<datas.length;i++) {
        let tmp = "<button id='store"+i+"' data-index='"+datas[i][1]+"' class='store' onclick='javascript:window.location.href = \"customer-storeInfo.html?" + datas[i][0] + "\"'><div id='photo' class='photo'>";
        tmp += '<img src="store_img/'+datas[i][2]+'" /></div>';
        tmp += '<div id="information" class="information"><h3>'+datas[i][1]+'</h3>';
        if(datas[i][4]==true) tmp += '<p>環境狀態: 已清潔</p>';
        else tmp += '<p>環境狀態: 未更新</p>';
        if(datas[i][3]==true) tmp += '<p>營業狀態: 營業中</p></div></button>';
        else tmp += '<p>營業狀態: 休息中</p></div></button>';

        $('#stores').append(tmp);
    }
}

var storeAddr, coin;
var storeName="";
const getAddress = document.getElementById('address');
function scan(){
    cordova.plugins.barcodeScanner.scan(
        function(result){
            if(!result.cancelled){
                if(result.format == "QR_CODE") {
                    storeAddr = result.text;
                    getStore();
                    // getAddress.innerText = value;
                    // ws.send(value);  
                    // ws.send(localStorage.address);
                }
            }
        },
        function (error) {
            alert('Scanning Failed '+error);
        }
    );
}


// function scan() {
//     storeAddr = "0xDf11D1f32DAF325aa4Ce385A08c33F4D05Ab5FB9";
//     console.log(localStorage.address);
//     getStore();
//     // ws.send(storeAddr);  
//     // ws.send(localStorage.address);
// }

function getStore(){
    ws = new WebSocket("ws://192.168.0.123:6012");
    
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "getStoreName";
        let jsonData = JSON.stringify(sendData);
        console.log(storeAddr);
        ws.send(jsonData);
        ws.send(storeAddr);
    };
    ws.onmessage = function (event) {
        storeName = JSON.parse(event.data);
        $('#address').html(storeName);
    };
    // ws.onclose = function(evt) {
    //     console.log("close");
    // };
}

function transfer(){
    if(storeName != ""){
            
        coin = $('#sendCoin').val();
        ws = new WebSocket("ws://192.168.0.123:6012");
        
        ws.onopen = function () {
            console.log('open');
            sendData["Main"] = "asiaToken";
            sendData["Type"] = "transferFrom";
            let jsonData = JSON.stringify(sendData);
            ws.send(jsonData);
            ws.send(localStorage.address);
            ws.send(storeAddr);
            ws.send(coin);
            ws.send(localStorage.pwd);
        };
        ws.onmessage = function (event) {
            var state = JSON.parse(event.data);
            if(state == "Success"){
                console.log(state);
            }
        };
        ws.onclose = function(evt) {
            console.log("close");
        };
    }else{
        alert("Scan QRCode!");
    }
}
// -------------------------Search----------------------------//
function runSearch(e) {     //及時搜尋會辦 "Enter"
    if (e.keyCode === 13){
        realSearch();
    }
}
function realSearch(){
    let temp = $("#find").val();
    if(!temp){
        $('#m-search').html("");
    }else{
        $('#m-search').html('.store:not([data-index*="' + temp + '"]) {display: none;}');
    }
}