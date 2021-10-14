var datas = [];
let sendData = new Object();
function onload(){
    let url = location.href;
    let storeAddress = url.split("?")[1];
    console.log(url);
    console.log(storeAddress);

    var ws = new WebSocket("ws://192.168.68.52:6001"); 
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "storeInfoForUser";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
    };
    ws.onmessage = function (event) {
        
        var n = event.data;
        
        if(n=="check"){
            ws.send(storeAddress);
            ws.onmessage = function (event) {
                datas.push(JSON.parse(event.data));
                console.log(datas);

            };
            
        }
        
    };
    ws.onclose = function(evt) {
        setInfo();
    };
}

function setInfo() {
    $('#storeImg').attr('src','store_img/'+datas[0][2]+'');
    $('#storeName').html('<h2>'+datas[0][1]+'</h2><button id="flip" onclick="javascript:opened();" class="dropbtn">Dropdown</button>');
    $('#foodSafety').attr('onclick','javascript:window.location.href = \"customer-foodin-list.html?'+datas[0][0]+'\"');
    // $('#foodSafety').attr('onclick','javascript:window.location.href = \"xxxx.html?'+words[0][0]+'\"">');
    // $('#comment').attr('onclick','javascript:window.location.href = \"xxxx.html?'+words[0][0]+'\"">');
    // $('#menu').attr('onclick','javascript:window.location.href = \"xxxx.html?'+words[0][0]+'\"">');
}

