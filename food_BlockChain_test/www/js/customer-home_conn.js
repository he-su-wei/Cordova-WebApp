var datas = [];
let sendData = new Object();
function onload(){
    var ws = new WebSocket("ws://192.168.0.105:6012");
    
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
        let tmp = "<button id='store"+i+"' class='store' onclick='javascript:window.location.href = \"customer-storeInfo.html?" + datas[i][0] + "\"'><div id='photo' class='photo'>";
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

function getStore(){
    var ws = new WebSocket("ws://192.168.0.105:6012");
    
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "getStoreName";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        ws.send(storeAddr);
    };
    ws.onmessage = function (event) {
        storeName = event.data;
        $('#address').html(storeName);
    };
    ws.onclose = function(evt) {
        console.log("close");
    };
}

function transfer(){
    if(storeName != ""){
            
        coin = $('#sendCoin').val();
        var ws = new WebSocket("ws://192.168.0.105:6012");
        
        ws.onopen = function () {
            console.log('open');
            sendData["Main"] = "clientContract";
            sendData["Type"] = "transferFrom";
            let jsonData = JSON.stringify(sendData);
            ws.send(jsonData);
            ws.send(storeAddr);
            ws.send(localStorage.address);
            ws.send(coin);
        };
        ws.onmessage = function (event) {
            var state = event.data;
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