let sendData = new Object();

// var ws = new WebSocket("ws://120.108.111.231:6012");
function onload() {

    // ws.onopen = function () {
    //     console.log('open');
    //     sendData["Main"] = "clientContract";
    //     sendData["Type"] = "signup";
    //     let jsonData = JSON.stringify(sendData);
    //     ws.send(jsonData);
    // };

    // ws.onmessage = function (event) {
    //   // console.log(event.data)
    //   var str = event.data;
    //   document.getElementById('bool').value = str;
    // };
}
function check(){
    var name = document.getElementById('name').value;
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;
    console.log(name);

    var ws = new WebSocket("ws://120.108.111.231:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "clientContract";
        sendData["Type"] = "signup";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        ws.send(name);
        ws.send(account);
        ws.send(password);
    };

    ws.onmessage = function (event) {
        console.log(event.data)
        var check = JSON.parse(event.data);
        if (check=="帳號重複"){
            alert("使用者帳號已經有人使用!");
        }else{
            alert('註冊成功');
            localStorage.address = check;
            localStorage.name = name;
            localStorage.pwd = password;
            window.location.href = 'customer-login.html';
        }
    };
};