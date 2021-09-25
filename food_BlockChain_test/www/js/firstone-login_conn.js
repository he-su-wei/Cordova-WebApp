<<<<<<< HEAD
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    ws.send(0);
};

// ws.onmessage = function (event) {
//   // console.log(event.data)
//   var str = event.data;
//   document.getElementById('bool').value = str;
// };
function check(){
    var address = document.getElementById('address').value;
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;

    ws.send(address);
    ws.send(account);
    ws.send(password);
    
    ws.onmessage = function (event) {
    // console.log(event.data)
    var check = event.data;
    if (check=="true"){
        localStorage.address = address;
        alert('登入成功');
        window.location.href='loginafter.html';
    }
    else if (check=="false"){
        alert('資料錯誤');
    }
    };
    
=======
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    ws.send(0);
};

// ws.onmessage = function (event) {
//   // console.log(event.data)
//   var str = event.data;
//   document.getElementById('bool').value = str;
// };
function check(){
    var address = document.getElementById('address').value;
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;

    ws.send(address);
    ws.send(account);
    ws.send(password);
    
    ws.onmessage = function (event) {
    // console.log(event.data)
    var check = event.data;
    if (check=="true"){
        localStorage.address = address;
        alert('登入成功');
        window.location.href='loginafter.html';
    }
    else if (check=="false"){
        alert('資料錯誤');
    }
    };
    
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
};