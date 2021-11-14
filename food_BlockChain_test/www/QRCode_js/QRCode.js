

//----------------------按鈕事件繫結：------------------------//
var light = false;
$('#btn1').click(function () {
    if (light) {
        QRScanner.enableLight();
        alert('enableLight');
    } else {
        QRScanner.disableLight();
    }
    light = !light;
});

//切換前後攝像頭
var frontCamera = false;
$('#btn2').click(function () {
    if (frontCamera) {
        QRScanner.useFrontCamera();
        alert('useFrontCamera');
    } else {
        QRScanner.useBackCamera();
    }
    frontCamera = !frontCamera;
});