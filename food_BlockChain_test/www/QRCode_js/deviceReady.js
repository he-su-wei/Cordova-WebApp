//----------在deviceReady 事件中繫結-------------//

if (typeof (QRScanner) != 'undefined') {
    //初始化檢測，申請攝像頭等許可權
    QRScanner.prepare(onDone); // show the prompt
} else {
    alert('外掛載入失敗');
}

function onDone(err, status) {
    if (err) {
        console.error(err);
    }
    if (status.authorized) {
        //繫結掃描監聽
        // `QRScanner.cancelScan()` is called.
        QRScanner.scan(displayContents);
        function displayContents(err, text) {
            if (err) {
                // an error occurred, or the scan was canceled (error code `6`)
                alert('啟動掃描出錯：' + JSON.stringify(err));
            } else {
                // The scan completed, display the contents of the QR code:
                alert(text);
            }
        }
        //開始掃描，需要將頁面的背景設定成透明
        QRScanner.show();

    } else if (status.denied) {
        // The video preview will remain black, and scanning is disabled. We can
        // try to ask the user to change their mind, but we'll have to send them
        // to their device settings with `QRScanner.openSettings()`.
        alert('使用者拒絕訪問攝像頭');
    } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
    }
}