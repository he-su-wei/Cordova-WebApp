
let sendData = new Object();
var ws
function onload() {
    ws = new WebSocket("ws://192.168.0.105:6012");
    
    ws.onopen = function () {
        console.log('open');
        
        sendData["Main"] = "storeContract";
        sendData["Type"] = "StoreStateLoad";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        
        console.log(localStorage.status);
        console.log(localStorage.address);
        if(localStorage.status == "營業中"){
            $('#status').text("營業中");
        }
        else if(localStorage.status == "已打烊"){
            $('#status').text("已打烊");
        }
    };
    
    n = [];
    ws.onmessage = function (event) {
        n.push(JSON.parse(event.data));
        console.log(n)
        if(n == "check"){
            ws.send(localStorage.address);
        }
        else if(n[1] == true){
            localStorage.status = "營業中";
            $('#status').text("營業中");
        }
        else if(n[1] == false){
            localStorage.status = "已打烊";
            $('#status').text("已打烊");
        }
    };
}
function opening() { 
    
    ws = new WebSocket("ws://192.168.0.105:6012");
    
    ws.onopen = function () {
        console.log('open');
        
        sendData["Main"] = "storeContract";
        sendData["Type"] = "StoreStateOpen";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        
        console.log(localStorage.status);
        console.log(localStorage.address);
        if(localStorage.status == "營業中"){
            $('#status').text("營業中");
        }
        else if(localStorage.status == "已打烊"){
            $('#status').text("已打烊");
        }
    };
    
    ws.onmessage = function (event) {
        var n = JSON.parse(event.data);
        console.log(n)
        if(n == "check"){
            ws.send(localStorage.address);
            ws.send(localStorage.account);
            ws.onmessage = function (event) {
                storeState = JSON.parse(event.data);
                console.log(storeState);
                if(storeState = true){
                    localStorage.status == "營業中";
                    $('#status').text("營業中");
                }
            };
        }
    };
};

function closed(){
    ws = new WebSocket("ws://192.168.0.105:6012");
    
    ws.onopen = function () {
        console.log('open');
        
        sendData["Main"] = "storeContract";
        sendData["Type"] = "StoreStateOpen";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        
        console.log(localStorage.status);
        console.log(localStorage.address);
        if(localStorage.status == "營業中"){
            $('#status').text("營業中");
        }
        else if(localStorage.status == "已打烊"){
            $('#status').text("已打烊");
        }
    };
    

    ws.onmessage = function (event) {
        var n = JSON.parse(event.data);
        console.log(n)
        if(n == "check"){
            ws.send(localStorage.address);
            ws.send(localStorage.account);
            ws.onmessage = function (event) {
                storeState = JSON.parse(event.data);
                console.log(storeState);
                if(storeState = false){
                    localStorage.status == "已打烊";
                    $('#status').text("已打烊");
                }
            };
        }
    };
};