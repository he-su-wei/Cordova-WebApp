window.addEventListener('load', function () {
   // const n1 = document.getElementById('takeName')
   // console.log(n1)
   // n1.innerText = "麥當勞"


   var NowDate=new Date();
   var m1=NowDate.getMonth()+1;
   var d=NowDate.getDate();
   var h=NowDate.getHours();
   var m=NowDate.getMinutes();
   var s=NowDate.getSeconds();　
   document.getElementById('takeDay').innerHTML = m1+' 月 '+d+' 號 '+h+' 時 '+m+' 分';



   const btn =this.document.getElementById('login-home')
   btn.addEventListener('click', function () {
        window.location = 'main.html'
   })
})



function openNav() {
document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}



