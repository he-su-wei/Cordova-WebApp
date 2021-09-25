<<<<<<< HEAD
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    ws.send(3);
};

var datas = [];
ws.onmessage = function (event) {
    datas.push(event.data);
    if(datas[0] == "check"){
        ws.send(localStorage.address);
    }
    console.log(datas)
    //從python傳進來的值會長 --> [1630734778, 1630734813]
    //放入datas arr裡後 --> ['[1630734778, 1630734813]']
    //進行處理
    for (var i=1; i<datas.length; i++) {
        if(i==1){
            var data = datas[1].toString();
            // console.log(data);
            var sData = data.replace("[", "");
            var sData2 = sData.replace("]", "");
            var words = sData2.split(', ');
            // console.log(words[1]);
        }
        else if(i==2){
            var data2 = datas[2].toString();
            // console.log(data2);
            var sData3 = data2.replace("[", "");
            var sData4 = sData3.replace("]", "");
            var sData5 = sData4.replace(/["]+/g, '');
            var words2 = sData5.split(', ');
            // console.log(words2[1]);
        }
    }
    console.log(datas);
    console.log(event.data);

    if(datas.length == 3){
        var tbody = document.querySelector('tbody');
        for (var i=0; i<words.length; i++) { 
            var tr = document.createElement('tr');
            tbody.appendChild(tr);

            if(words[i] == ""){
                //<td>id</td>
                var td = document.createElement('td');
                td.innerHTML = "無資料";
                tr.appendChild(td);
                //unixTime 轉換
                //<td>unixTime</td>
                var td2 = document.createElement('td');
                td2.innerHTML = "無資料";
                tr.appendChild(td2);
                //<td>狀態</td>
                var td3 = document.createElement('td');
                td3.innerHTML = "無資料";
                tr.appendChild(td3);
            }
            else{
                //<td>id</td>
                var td = document.createElement('td');
                td.innerHTML = words2[i];
                tr.appendChild(td);
                //unixTime 轉換
                //<td>unixTime</td>
                var td2 = document.createElement('td');
                var date = new Date(parseInt(words[i])*1000);
                td2.innerHTML = date.toLocaleString();
                tr.appendChild(td2);
                //<td>狀態</td>
                var td3 = document.createElement('td');
                td3.innerHTML = "進貨";
                tr.appendChild(td3);
            }
        }
    }
    
=======
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    ws.send(3);
};

var datas = [];
ws.onmessage = function (event) {
    datas.push(event.data);
    if(datas[0] == "check"){
        ws.send(localStorage.address);
    }
    console.log(datas)
    //從python傳進來的值會長 --> [1630734778, 1630734813]
    //放入datas arr裡後 --> ['[1630734778, 1630734813]']
    //進行處理
    for (var i=1; i<datas.length; i++) {
        if(i==1){
            var data = datas[1].toString();
            // console.log(data);
            var sData = data.replace("[", "");
            var sData2 = sData.replace("]", "");
            var words = sData2.split(', ');
            // console.log(words[1]);
        }
        else if(i==2){
            var data2 = datas[2].toString();
            // console.log(data2);
            var sData3 = data2.replace("[", "");
            var sData4 = sData3.replace("]", "");
            var sData5 = sData4.replace(/["]+/g, '');
            var words2 = sData5.split(', ');
            // console.log(words2[1]);
        }
    }
    console.log(datas);
    console.log(event.data);

    if(datas.length == 3){
        var tbody = document.querySelector('tbody');
        for (var i=0; i<words.length; i++) { 
            var tr = document.createElement('tr');
            tbody.appendChild(tr);

            if(words[i] == ""){
                //<td>id</td>
                var td = document.createElement('td');
                td.innerHTML = "無資料";
                tr.appendChild(td);
                //unixTime 轉換
                //<td>unixTime</td>
                var td2 = document.createElement('td');
                td2.innerHTML = "無資料";
                tr.appendChild(td2);
                //<td>狀態</td>
                var td3 = document.createElement('td');
                td3.innerHTML = "無資料";
                tr.appendChild(td3);
            }
            else{
                //<td>id</td>
                var td = document.createElement('td');
                td.innerHTML = words2[i];
                tr.appendChild(td);
                //unixTime 轉換
                //<td>unixTime</td>
                var td2 = document.createElement('td');
                var date = new Date(parseInt(words[i])*1000);
                td2.innerHTML = date.toLocaleString();
                tr.appendChild(td2);
                //<td>狀態</td>
                var td3 = document.createElement('td');
                td3.innerHTML = "進貨";
                tr.appendChild(td3);
            }
        }
    }
    
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
};