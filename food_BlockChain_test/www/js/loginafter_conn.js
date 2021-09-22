var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    ws.send(1);
};

n = [];
ws.onmessage = function (event) {
    n.push(event.data);
    console.log(n)
    if(n[0]=="check"){
        ws.send(localStorage.address);
    }
    console.log(localStorage.address);
    var str = n[1];
    genode(str, 'storeName');
    function genode(str, id) {
        document.getElementById(id).innerHTML = str;
    }
};

// console.log(localStorage.address)