let sendData = new Object();

function onload() {
    getbalance();
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
        $('#storeName').html(storeName);
    };
    // ws.onclose = function(evt) {
    //     console.log("close");
    // };
}

function getbalance(){
    var ws = new WebSocket("ws://192.168.68.52:6001");

    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "asiaToken";
        sendData["Type"] = "getBalance";
        let jsonData = JSON.stringify(sendData);
        // console.log(localStorage.address);

        var ad = "0xDf11D1f32DAF325aa4Ce385A08c33F4D05Ab5FB9";
        console.log(ad);
        ws.send(jsonData);
        ws.send(ad);
    };

    ws.onmessage = function (event) {
        console.log(event.data)
        let str = event.data;
        $('#balanceText').text(str);
    };
}
function getCoin(){
    var ws = new WebSocket("ws://192.168.68.52:6001");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "asiaToken";
        sendData["Type"] = "transfer";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        var ad = "0xDf11D1f32DAF325aa4Ce385A08c33F4D05Ab5FB9";
        ws.send(ad);
    };

    ws.onmessage = function (event) {
        console.log(event.data)
        setTimeout(getbalance, 2000);
    };
}


//-------------------qrcode-------------------------//
const getAddress = document.getElementById('address');
function scan(){
    cordova.plugins.barcodeScanner.scan(
        function(result){
            if(!result.cancelled){
                if(result.format == "QR_CODE") {
                    var value = result.text;
                    getAddress.innerText = value;
                    ws.send(value);  
                    ws.send(localStorage.address);
                }
            }
        },
        function (error) {
            alert('Scanning Failed '+error);
        }
    );
}
