let sendData = new Object();
var ws = new WebSocket("ws://192.168.68.52:6001");

ws.onopen = function () {
    console.log('open');
    sendData["Main"] = "clientContract";
    sendData["Type"] = "signup";
    let jsonData = JSON.stringify(sendData);
    ws.send(jsonData);

};

// ws.onmessage = function (event) {
//   // console.log(event.data)
//   var str = event.data;
//   document.getElementById('bool').value = str;
// };
function check(){
    var name = document.getElementById('name').value;
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;
    var rePassword = document.getElementById('rePassword').value;


    if(password == rePassword){
        ws.send(name);
        ws.send(account);
        ws.send(password);
        ws.onmessage = function (event) {
            console.log(event.data)
            var check = JSON.parse(event.data);
            if (check=="帳號重複"){
                alert("使用者帳號已經有人使用!");
            }
            if (check=="註冊成功"){
                alert('註冊成功');
                window.location.href='customer-login.html';
            }
        };

    }
    else if(password != rePassword){
        alert('兩次密碼不一樣!');
    }
    
    
    
    
};