var done = function(err, status){
    if(err){
        console.error(err._message);
    } else {
        console.log('QRScanner is initialized. Status:');
        console.log(status);
    }
};
  
QRScanner.prepare(done);

//------------監聽掃描結果、取消監聽 ----------//
var callback = function(err, contents){
    if(err){
        console.error(err._message);
    }
    alert('The QR Code contains: ' + contents);
};
QRScanner.scan(callback);
  
QRScanner.cancelScan(function(status){
    console.log(status);
});

//-------------開啟和隱藏掃描-----------//
QRScanner.show(function(status){
    console.log(status);
});
QRScanner.hide(function(status){
    console.log(status);
});


//---------------切換前後攝像頭--------------------//
QRScanner.enableLight(function(err, status){
    err && console.error(err);
    console.log(status);
});
QRScanner.disableLight(function(err, status){
    err && console.error(err);
    console.log(status);
});



//---------------銷燬、其他api參考git-----------//
QRScanner.destroy(function(status){
    console.log(status);
});