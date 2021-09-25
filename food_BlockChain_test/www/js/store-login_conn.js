<<<<<<< HEAD
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    console.log(localStorage.address);
    ws.send(8);
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
    var str = n[1];
    genode(str, 'storeName');
    function genode(str, id) {
        document.getElementById(id).innerHTML = str;
    }
    
};


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
=======
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    console.log(localStorage.address);
    ws.send(8);
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
    var str = n[1];
    genode(str, 'storeName');
    function genode(str, id) {
        document.getElementById(id).innerHTML = str;
    }
    
};


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
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
