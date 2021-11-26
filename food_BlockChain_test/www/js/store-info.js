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
        
        console.log(localStorage.address);
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

        ws.send(localStorage.address);
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
