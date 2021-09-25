var datas = [];
var data = [];
var words = [];
function onload(){
    let url = location.href;
    let storeAddress = url.split("?")[1];
    console.log(url);
    console.log(storeAddress);

    var ws = new WebSocket("ws://192.168.68.50:6001"); 
    ws.onopen = function () {
        console.log('open');
        ws.send(9);
    };
    ws.onmessage = function (event) {
        
        var n = event.data;
        
        if(n=="check"){
            ws.send(storeAddress);
            ws.onmessage = function (event) {
                datas.push(event.data);
                console.log(datas);

                for (var i = 0; i < datas.length; i++) {
                    if(data == ""){
                        data.push(datas[i].toString());
                    }
                    else if(datas[i] == data[i]){
                        continue;
                    }
                    else{
                        data.push(datas[i].toString());
                    }
                    var sData = data[i].replace("(", "");
                }
                var sData2 = sData.replace(/\'/g, "");
                var sData3 = sData2.replace(")", "");
                words.push(sData3.split(', '));
    
                console.log(words);
            };
            
        }
        
    };
    ws.onclose = function(evt) {
        setInfo();
    };
}

function setInfo() {
    $('#storeImg').attr('src','img/'+words[0][2]+'');
    $('#storeName').html('<h2>'+words[0][1]+'</h2><a id="flip" onclick="" class="dropbtn">Dropdown</a>');
    
    // $('#foodSafety').attr('onclick','javascript:window.location.href = \"xxxx.html?'+words[0][0]+'\"">');
    // $('#comment').attr('onclick','javascript:window.location.href = \"xxxx.html?'+words[0][0]+'\"">');
    // $('#menu').attr('onclick','javascript:window.location.href = \"xxxx.html?'+words[0][0]+'\"">');
}