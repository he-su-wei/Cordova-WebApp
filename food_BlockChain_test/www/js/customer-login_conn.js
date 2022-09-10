let sendData = new Object();
var ws = new WebSocket("ws://120.108.111.231:6012");

ws.onopen = function () {
    console.log('open');
    sendData["Main"] = "clientContract";
    sendData["Type"] = "customerLogin";
    let jsonData = JSON.stringify(sendData);
    ws.send(jsonData);
};


function check(){
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;

    ws.send(account);
    ws.send(password);

    ws.onmessage = function (event) {
        console.log(event.data)
        var check = event.data.split(",");
        if (check[0]!="Fail"){
            alert("登入成功!");
            localStorage.userName = check[0];
            localStorage.address = check[1].replace('"', '');
            window.location.href='customer-home.html';
        }else{
            // localStorage.address = address;
            alert('資料錯誤');
            window.location.href='customer-login.html';
        }
    };
    
};