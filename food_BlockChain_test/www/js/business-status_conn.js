
let sendData = new Object();
var ws
function onload() {
    ws = new WebSocket("ws://192.168.68.52:6001");
    
    ws.onopen = function () {
        console.log('open');
        
        sendData["Main"] = "storeContract";
        sendData["Type"] = "StoreState";
        let jsonData = JSON.stringify(sendData);
        ws.send(jsonData);
        
        console.log(localStorage.status);
        console.log(localStorage.address);
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
    
    ws.onmessage = function (event) {
        n = event.data;
        console.log(n)
        if(n == "check"){
            ws.send(localStorage.address);
            ws.send(localStorage.pwd);
        }
        // else if(n == "True"){
        //     localStorage.status = "營業中";
        //     var str = "營業中";
        //     genode(str, 'status');
        //     function genode(str, id) {
        //         document.getElementById(id).innerHTML = str;
        //     }
        // }
        // else if(n == "False"){
        //     localStorage.status = "已打烊";
        //     var str = "已打烊";
        //     genode(str, 'status');
        //     function genode(str, id) {
        //         document.getElementById(id).innerHTML = str;
        //     }
        // }
    };
}
function opening() {   
    ws.send(localStorage.address);
    ws.onmessage = function (event) {   
        console.log(event.data);
        if(event.data == "true"){
            localStorage.status = "營業中";
            var str = "營業中";
            genode(str, 'status');
            function genode(str, id) {
                document.getElementById(id).innerHTML = str;
            }
        }
    }
};

function closed(){
    ws.send(localStorage.address);
    ws.onmessage = function (event) {  
         
        if(event.data == "false"){
            localStorage.status = "已打烊";
            var str = "已打烊";
            genode(str, 'status');
            function genode(str, id) {
                document.getElementById(id).innerHTML = str;
            }
        }
    }
    
};