let sendData = new Object();

function onload() {
    getbalance();
}

function getbalance(){
    var ws = new WebSocket("ws://192.168.0.105:6012");

    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "asiaToken";
        sendData["Type"] = "getBalance";
        let jsonData = JSON.stringify(sendData);
        // console.log(localStorage.address);

        // var ad = "0xDf11D1f32DAF325aa4Ce385A08c33F4D05Ab5FB9";
        // console.log(ad);
        ws.send(jsonData);
        ws.send(localStorage.address);
    };

    ws.onmessage = function (event) {
        console.log(event.data)
        let str = event.data;
        $('#balanceText').text(str);
    };
}
function getCoin(){
    var ws = new WebSocket("ws://192.168.0.105:6012");
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
        setTimeout(getbalance, 2000);
    };
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
    ws = new WebSocket("ws://192.168.0.105:6012");
    
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
        ws = new WebSocket("ws://192.168.0.105:6012");
        
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


// //-------------------qrcode-------------------------//
// const getAddress = document.getElementById('address');
// function scan(){
//     cordova.plugins.barcodeScanner.scan(
//         function(result){
//             if(!result.cancelled){
//                 if(result.format == "QR_CODE") {
//                     var value = result.text;
//                     getAddress.innerText = value;
//                     ws.send(value);  
//                     ws.send(localStorage.address);
//                 }
//             }
//         },
//         function (error) {
//             alert('Scanning Failed '+error);
//         }
//     );
// }
