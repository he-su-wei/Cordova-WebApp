let sendData = new Object();

function onload(){
}
function checkLogin(){
    var address = document.getElementById('address').value;
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;
    
    ws = new WebSocket("ws://120.108.111.231:6012")
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "firstLogin";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        ws.send(address);
        ws.send(account);
        ws.send(password);
    };

    ws.onmessage = function (event) {
        // console.log(event.data)
        var check = event.data;
        if (check=="true"){
            localStorage.address = address;
            localStorage.account = account;
            alert('登入成功');
            window.location.href='loginafter.html';
        }
        else if (check=="false"){
            alert('資料錯誤');
        }
    };
};