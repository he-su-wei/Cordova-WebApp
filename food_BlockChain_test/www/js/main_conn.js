let sendData = new Object();
var ws;
function onload() {

    function appendzero(obj){
        if (obj < 10) return "0" + obj;
        else return obj;
    }
    var NowDate=new Date();
    var year=NowDate.getFullYear();
    var month=NowDate.getMonth()+1;
    var date=NowDate.getDate();
    var hour=NowDate.getHours();
    var min=NowDate.getMinutes();
    var s=NowDate.getSeconds();
    let time = appendzero(hour) + ":" + appendzero(min)
    let day = year + "-"　+appendzero(month)+ "-" +appendzero(date)
    document.getElementById('takeTime').innerHTML = time ;
    document.getElementById('takeDay').innerHTML =`<b>${day}</b>`  ;

    ws = new WebSocket("ws://192.168.68.52:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "mainLoad";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        console.log(localStorage.status);
        if(localStorage.status == "營業中"){
            $('#status').text("營業中");
        }
        else if(localStorage.status == "已打烊"){
            $('#status').text("已打烊");
        }
    };

    n = [];
    ws.onmessage = function (event) {
        
        n.push(JSON.parse(event.data));
        console.log(n);
        if(n[0]=="check"){
            ws.send(localStorage.address);
        }
        console.log(localStorage.address);
        var str = n[1];
        genode(str, 'storeName');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
        }

        if(n[2] == true){
            $('#status').text("營業中");
        }
        else if(n[2]==false){
            $('#status').text("已打烊");
        }
        
        
        
    };
    ws.onerror = function (e) {
        console.log(e);
        document.getElementById('dataID').value = 'error';
    };

    ws.onclose = function (event) {
        console.log('close code=' + event.code);
    };

    
}

function scan(){

    ws = new WebSocket("ws://192.168.68.52:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "setTime";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        console.log(localStorage.status);
        if(localStorage.status == "營業中"){
            $('#status').text("營業中");
        }
        else if(localStorage.status == "已打烊"){
            $('#status').text("已打烊");
        }
    };

    ws.onmessage = function (event) {
        
        var n = JSON.parse(event.data);
        console.log(n);
        if(n=="check"){
            
            cordova.plugins.barcodeScanner.scan(
                function(result){
                    if(!result.cancelled){
                        if(result.format == "QR_CODE") {
                            var value = result.text;
                            console.log(value);
                            ws.send(localStorage.address);
                            ws.send(localStorage.account);
                            ws.send(value);  
                        }
                    }
                },
                function (error) {
                    alert('Scanning Failed '+error);
                }
            );
        }
    };
    ws.onerror = function (e) {
        console.log(e);
        document.getElementById('dataID').value = 'error';
    };

    ws.onclose = function (event) {
        console.log('close code=' + event.code);
    };

}



function kit(){
    ws = new WebSocket("ws://192.168.68.52:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "setKitClenTime";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);

        console.log(localStorage.status);
        if(localStorage.status == "營業中"){
            $('#status').text("營業中");
        }
        else if(localStorage.status == "已打烊"){
            $('#status').text("已打烊");
        }
    };

    ws.onmessage = function (event) {
        var n = JSON.parse(event.data);
        console.log(n);
        if(n=="check"){
            ws.send(localStorage.address);
            ws.send(localStorage.account);
        }
    };
    ws.onerror = function (e) {
        console.log(e);
        document.getElementById('dataID').value = 'error';
    };

    ws.onclose = function (event) {
        console.log('close code=' + event.code);
    };

}

// ---------small windows--------//
var qrcode = new QRCode(document.getElementById("qrcode"), {
	width : 200,
	height : 200
});

function makeCode() {		
	// var elText = document.getElementById("text");
    // localStorage.address="0x17F6AD8Ef982297579C203069C1DbfFE4348c372";
    var elText = localStorage.address;
	
	if (!elText) {
		alert("No Adderss");
		elText.focus();
		return;
	}
	
	// qrcode.makeCode(elText.value);
    qrcode.makeCode(elText);
}

makeCode();

$("#text").
	on("blur", function () {
		makeCode();
	}).
	on("keydown", function (e) {
		if (e.keyCode == 13) {
			makeCode();
		}
	});