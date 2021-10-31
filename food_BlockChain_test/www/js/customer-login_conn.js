let sendData = new Object();
function onload() {
    var ws = new WebSocket("ws://192.168.68.52:6001");

    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "clientContract";
        sendData["Type"] = "customerLogin";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
    };
}

function check(){
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;

    ws.send(account);
    ws.send(password);

    ws.onmessage = function (event) {
        console.log(event.data)
        var check = event.data;
        if (check=="true"){
            alert("登入成功!");
            window.location.href='customer-home.html';
        }
        if (check=="false"){
            // localStorage.address = address;
            alert('資料錯誤');
            window.location.href='customer-login.html';
        }
    };
    
};