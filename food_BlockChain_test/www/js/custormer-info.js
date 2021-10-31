let sendData = new Object();
function onload() {
    getbalance();
}
function getbalance(){
    var ws = new WebSocket("ws://192.168.68.52:6001");

    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "asiaToken";
        sendData["Type"] = "getBalance";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        ws.send(localStorage.address);
    };

    ws.onmessage = function (event) {
        // console.log(event.data)
        let str = event.data;
        $('#balanceText').val(str);
        ws.close();
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
        ws.send(localStorage.address);
    };

    ws.onmessage = function (event) {
        console.log(event.data)
        ws.close();
        setTimeout(getbalance, 2000);
    };
}