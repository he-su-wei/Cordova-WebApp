let flag = false;

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$('input[type="file"]').change(function(e) {
    let fileName = e.target.files[0].name;
    $("#preview").attr("alt", fileName);

    let reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});

function checkText(text) {
    if ($('#password').val() == text) {
        $('#rePassword').css('border-color','#2ecc71');
        flag = true;
    }else {
        $('#rePassword').css('border-color','#cc2e2e');
    }
}
function getFlag() {
    if (flag) check();
    else{
        alert("第二次密碼輸入錯誤");
        // window.plugins.toast.showWithOptions(
        //     {
        //       message: "密碼不相同！",
        //       duration: "short",
        //       position: "bottom",
        //       addPixelsY: -40
        //     },
        // );
    }
}