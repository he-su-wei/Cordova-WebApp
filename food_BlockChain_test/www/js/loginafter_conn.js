let sendData = new Object();
n = [];
function onload() {
    var ws = new WebSocket("ws://192.168.68.52:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "refresh";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
    };

    
    ws.onmessage = function (event) {
        n.push(JSON.parse(event.data));
        console.log(n)
        if(n[0]=="check"){
            ws.send(localStorage.address);
            ws.send(localStorage.pwd);
        }
        console.log(localStorage.address);
        var str = n[1];
        genode(str, 'storeName');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
        }
        setImg(str);
    };
    ws.onclose = function(event) {
    };
}

function setImg(str){
    // let tmp = '<img class="img-size" src="store_img/'+str+'.png" />';
    $('.img-size').attr("src","store_img/"+str+".png");
}
