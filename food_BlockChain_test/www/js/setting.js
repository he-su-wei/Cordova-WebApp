window.addEventListener('load', function () {

   
})
 
 
 
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}
 
function OnChangeCheckbox (checkbox) {
    if (checkbox.checked) {
        alert ("開始營業");
        let store_state = 1
        console.log(store_state)
    }
    else {
        alert ("結束營業");
        let store_state = 0
        console.log(store_state)
    }
}