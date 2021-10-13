

let storeAddress;
function onloaded(){

    var NowDate=new Date();
    var year=NowDate.getFullYear();
    var month=NowDate.getMonth()+1;
    var date=NowDate.getDate();
    var hour=NowDate.getHours();
    var min=NowDate.getMinutes();
    var s=NowDate.getSeconds();

    let time = appendzero(month)+ "-" +appendzero(date) + " " + appendzero(hour) + ":" + appendzero(min)
    document.getElementById('showbox').innerHTML = `更新時間:  ${time}`;
    

    let url = location.href;
    storeAddress = url.split("?")[1];
    console.log(url);
    console.log(storeAddress);

    var ws = new WebSocket("ws://192.168.68.50:6001");

    ws.onopen = function () {
        console.log('open');
        ws.send(12);
    };
    
    var datas = [];
    ws.onmessage = function (event) {
        datas.push(event.data);
        if(datas[0] == "check"){
            ws.send(storeAddress);
        }
        // console.log(datas)
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
                // console.log(words[0]);
            }
            else if(i==2){
                var data2 = datas[2].toString();
                // console.log(data2);
                var sData3 = data2.replace("[", "");
                var sData4 = sData3.replace("]", "");
                var sData5 = sData4.replace(/["]+/g, '');
                var words2 = sData5.split(', ');
                // console.log(words2[0]);
            }
        }
        // console.log(datas);
        // console.log(event.data);
    
        if(datas.length == 3){
            var tbody = document.querySelector('tbody');
            for (var i=0; i<words.length; i++) { 
                var tr = document.createElement('tr');
                tbody.appendChild(tr);
                
                //unixTime 轉換
                //<td>unixTime</td>
                if(words[i] == 0){
                    var td2 = document.createElement('td');
                    var date = new Date();
                    td2.innerHTML = date.toLocaleString();
                    tr.appendChild(td2);
                }
                else{
                    var td2 = document.createElement('td');
                    var date = new Date(parseInt(words[i])*1000);
                    td2.innerHTML = date.toLocaleString();
                    tr.appendChild(td2);
                }
                
    
                //<td>狀態</td>
                // console.log(words2[i]);
                if(words2[i] == "true"){
                    var td3 = document.createElement('td');
                    td3.innerHTML = "清理";
                    tr.appendChild(td3);
                }
                else if(words2[i] == "false"){
                    var td3 = document.createElement('td');
                    td3.innerHTML = "未清理";
                    tr.appendChild(td3);
                }
                
            }
        }
        
    };

    ws.onclose = function(evt) {
        setPage();
    };
}

function setPage() {
    $('#foodIn').attr('onclick','javascript:window.location.href = \"customer-foodin-list.html?'+ storeAddress +'\"');
    $('#foodClean').attr('onclick','javascript:window.location.href = \"customer-food-list.html?'+ storeAddress +'\"');
    $('#backPage').attr('onclick','javascript:window.location.href = \"customer-storeInfo.html?'+ storeAddress +'\"');
}

function appendzero(obj){
    if (obj < 10) return "0" + obj;
    else return obj;
}



