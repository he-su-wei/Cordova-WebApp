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

    console.log(localStorage.status);
    if(localStorage.status == "營業中"){
        var str = "營業中";
        genode(str, 'status');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
        }
    }
    else if(localStorage.status == "已打烊"){
        var str = "已打烊";
        genode(str, 'status');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
        }
    }
}

function scan(){
    ws = new WebSocket("ws://192.168.0.105:6012");
    ws.onopen = function () {
        console.log('open');
        sendData["Main"] = "storeContract";
        sendData["Type"] = "setTime";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
    };

    cordova.plugins.barcodeScanner.scan(
        function(result){
            if(!result.cancelled){
                if(result.format == "QR_CODE") {
                    var value = result.text;
                    ws.send(value);  
                    ws.send(localStorage.address);
                }
            }
        },
        function (error) {
            alert('Scanning Failed '+error);
        }
    );

    n = [];
    ws.onmessage = function (event) {
        
        n.push(JSON.parse(event.data));
        console.log(n);
        if(n=="check"){
            ws.send(localStorage.address);
            ws.send(localStorage.pwd);
        }
        console.log(localStorage.address);
        var str = n[1];
        genode(str, 'storeName');
        function genode(str, id) {
            document.getElementById(id).innerHTML = str;
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



// function setTime(){
//     var value = "Beef004";
//     ws.send(value);  
//     ws.send(localStorage.address);
// }



function kit(){
    ws.send(localStorage.address);
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