window.addEventListener('load', function () {
    const n1 = document.getElementById('status')
    const on = document.getElementById('on')
    const off = document.getElementById('off')
    on.addEventListener("click",()=>{
        n1.innerHTML = "營業中"
    })
    off.addEventListener("click",()=>{
        n1.innerHTML = "打烊"
    })

})



function openNav() {
document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}



