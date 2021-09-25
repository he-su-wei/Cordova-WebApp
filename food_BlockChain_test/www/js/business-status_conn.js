<<<<<<< HEAD
var ws = new WebSocket("ws://192.168.68.50:6001");
    
ws.onopen = function () {
    console.log('open');
    console.log(localStorage.status);
    console.log(localStorage.address);
    ws.send(6);
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
function opening() {   
    ws.send(localStorage.address);
    ws.onmessage = function (event) {   
        if(event.data == "True"){
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
        if(event.data == "False"){
            localStorage.status = "已打烊";
            var str = "已打烊";
            genode(str, 'status');
            function genode(str, id) {
                document.getElementById(id).innerHTML = str;
            }
        }
    }
    
=======
var ws = new WebSocket("ws://192.168.68.50:6001");
    
ws.onopen = function () {
    console.log('open');
    console.log(localStorage.status);
    console.log(localStorage.address);
    ws.send(6);
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
function opening() {   
    ws.send(localStorage.address);
    ws.onmessage = function (event) {   
        if(event.data == "True"){
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
        if(event.data == "False"){
            localStorage.status = "已打烊";
            var str = "已打烊";
            genode(str, 'status');
            function genode(str, id) {
                document.getElementById(id).innerHTML = str;
            }
        }
    }
    
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
};