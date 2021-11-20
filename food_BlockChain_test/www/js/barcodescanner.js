function scan(){
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
}

