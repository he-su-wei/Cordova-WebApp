<<<<<<< HEAD
var datas = [];
var data = [];
var words = [];
function onload(){
    var ws = new WebSocket("ws://192.168.68.50:6001");
    
    ws.onopen = function () {
        console.log('open');
        ws.send(7);
    };
    ws.onmessage = function (event) {
        datas.push(event.data);
        // console.log(datas);
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
    ws.onclose = function(evt) {
        setInfo();
    };
}

function setInfo(){
    for(let i=0;i<words.length;i++) {
        let tmp = "<button id='store"+i+"' class='store' onclick='javascript:window.location.href = \"customer-storeInfo.html?" + words[i][0] + "\"'><div id='photo' class='photo'>";
        tmp += '<img src="img/'+words[i][2]+'" /></div>';
        tmp += '<div id="information" class="information"><h3>'+words[i][1]+'</h3>';
        if(words[i][4]=="True") tmp += '<p>環境狀態: 已清潔</p>';
        else tmp += '<p>環境狀態: 未更新</p>';
        if(words[i][3]=="True") tmp += '<p>營業狀態: 營業中</p></div></button>';
        else tmp += '<p>營業狀態: 休息中</p></div></button>';

        $('#stores').append(tmp);
    }
=======
var ws = new WebSocket("ws://192.168.68.50:6001");
    
ws.onopen = function () {
    console.log('open');
    ws.send(7);
};

var datas = [];
var data = [];
var words = [];
function onload(){
    ws.onmessage = function (event) {
        datas.push(event.data);
        // console.log(datas);
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
    ws.onclose = function(evt) {
        setInfo();
    };
}

function setInfo(){
    for(let i=0;i<words.length;i++) {
        let tmp = '<button id="store'+i+'" class="store"><div id="photo" class="photo">';
        tmp += '<img src="img/'+words[i][1]+'" /></div>';
        tmp += '<div id="information" class="information"><h3>'+words[i][0]+'</h3>';
        if(words[i][3]=="True") tmp += '<p>環境狀態: 已清潔</p>';
        else tmp += '<p>環境狀態: 未更新</p>';
        if(words[i][2]=="True") tmp += '<p>營業狀態: 營業中</p></div></button>';
        else tmp += '<p>營業狀態: 休息中</p></div></button>';

        $('#stores').append(tmp);
    }
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
}