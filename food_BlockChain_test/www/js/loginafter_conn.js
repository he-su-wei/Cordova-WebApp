let sendData = new Object();
n = [];
function onload() {
    var ws = new WebSocket("ws://192.168.68.52:6001");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "refresh";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
    };

    
    ws.onmessage = function (event) {
        n.push(event.data);
        console.log(n)
        if(n[0]=="check"){
            ws.send(localStorage.address);
            ws.send(localStorage.pwd);
        }
        console.log(localStorage.address);
        var str = JSON.parse(n[1]);
        genode(str, 'storeName');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
        }
        
    };
    ws.onclose = function(event) {
        setImg()
    };
}

function setImg(){
    let tmp = '<img class="img-size" src="img/'+n[2]+'" /></div>'
    $('#stores').append(tmp);
}
