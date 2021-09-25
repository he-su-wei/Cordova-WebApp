<<<<<<< HEAD
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    console.log(localStorage.status);
    ws.send(2);
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
};

n = [];
ws.onmessage = function (event) {
    
    n.push(event.data);
    console.log(n);
    if(n=="check"){
        ws.send(localStorage.address);
    }
    // console.log(localStorage.address);
    var str = n[1];
    genode(str, 'storeName');
    function genode(str, id) {
        document.getElementById(id).innerHTML = str;
    }
    
    
};

// ws.onerror = function (e) {
//     console.log(e);
//     document.getElementById('dataID').value = 'error';
// };

// ws.onclose = function (event) {
//     console.log('close code=' + event.code);
// };



// function scan(){
//     cordova.plugins.barcodeScanner.scan(
//         function(result){
//             if(!result.cancelled){
//                 if(result.format == "QR_CODE") {
//                     var value = result.text;
//                     ws.send(value);  
//                     ws.send(localStorage.address);
//                 }
//             }
//         },
//         function (error) {
//             alert('Scanning Failed '+error);
//         }
//     );
// }



function setTime(){
    var value = "Beef004";
    ws.send(value);  
    ws.send(localStorage.address);
}



function kit(){
    ws.send(localStorage.address);
}
=======
var ws = new WebSocket("ws://192.168.68.50:6001");

ws.onopen = function () {
    console.log('open');
    console.log(localStorage.status);
    ws.send(2);
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
};

n = [];
ws.onmessage = function (event) {
    
    n.push(event.data);
    console.log(n);
    if(n=="check"){
        ws.send(localStorage.address);
    }
    // console.log(localStorage.address);
    var str = n[1];
    genode(str, 'storeName');
    function genode(str, id) {
        document.getElementById(id).innerHTML = str;
    }
    
    
};

// ws.onerror = function (e) {
//     console.log(e);
//     document.getElementById('dataID').value = 'error';
// };

// ws.onclose = function (event) {
//     console.log('close code=' + event.code);
// };



// function scan(){
//     cordova.plugins.barcodeScanner.scan(
//         function(result){
//             if(!result.cancelled){
//                 if(result.format == "QR_CODE") {
//                     var value = result.text;
//                     ws.send(value);  
//                     ws.send(localStorage.address);
//                 }
//             }
//         },
//         function (error) {
//             alert('Scanning Failed '+error);
//         }
//     );
// }



function setTime(){
    var value = "Beef004";
    ws.send(value);  
    ws.send(localStorage.address);
}



function kit(){
    ws.send(localStorage.address);
}
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
