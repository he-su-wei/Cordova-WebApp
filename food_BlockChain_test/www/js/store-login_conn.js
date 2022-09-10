let sendData = new Object();
var ws;
function onload() {
    ws = new WebSocket("ws://120.108.111.231:6012")
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "storeLogin";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        console.log(localStorage.address);
    };

    n = [];
    ws.onmessage = function (event) {
        // console.log(event.data);
        n.push(event.data);
        console.log(n);
        if(n[0]=="check"){
            ws.send(localStorage.address);
        }
        // console.log(localStorage.address);
        var str = JSON.parse(n[1]);
        genode(str, 'storeName');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
        }
        
    };
}

function check(){
    var account = document.getElementById('account').value;
    var password = document.getElementById('password').value;

 
    // ws.send(localStorage.address);
    ws.send(account);
    ws.send(password);
    
    ws.onmessage = function (event) {
        // console.log(event.data)
        var check = event.data;
        if (check=="true"){
            alert('登入成功');
            localStorage.account = account;
            window.location.href='loginafter.html';
        }
        else if (check=="false"){
            alert('資料錯誤');
        }
    };
    
};

function resetAddress(){
   localStorage.clear();
   window.location.href='firstone-login.html'; 
};
