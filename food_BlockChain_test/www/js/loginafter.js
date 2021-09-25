<<<<<<< HEAD
window.addEventListener('load', function () {
   // const n1 = document.getElementById('takeName')
   // console.log(n1)
   // n1.innerText = "麥當勞"

   function appendzero(obj){
      if (obj < 10) return "0" + obj;
      else return obj;
   }
   var NowDate=new Date();
   var year=NowDate.getFullYear();
   var month=NowDate.getMonth()+1;
   var date=NowDate.getDate();
   var hour=NowDate.getHours();
   var min=NowDate.getMinutes();
   var s=NowDate.getSeconds();
   let time = appendzero(hour) + ":" + appendzero(min)
   let day = year + "-"　+appendzero(month)+ "-" +appendzero(date)
   document.getElementById('takeTime').innerHTML = time ;
   document.getElementById('takeDay').innerHTML =`<b>${day}</b>`  ;


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
=======
window.addEventListener('load', function () {
   // const n1 = document.getElementById('takeName')
   // console.log(n1)
   // n1.innerText = "麥當勞"

   function appendzero(obj){
      if (obj < 10) return "0" + obj;
      else return obj;
   }
   var NowDate=new Date();
   var year=NowDate.getFullYear();
   var month=NowDate.getMonth()+1;
   var date=NowDate.getDate();
   var hour=NowDate.getHours();
   var min=NowDate.getMinutes();
   var s=NowDate.getSeconds();
   let time = appendzero(hour) + ":" + appendzero(min)
   let day = year + "-"　+appendzero(month)+ "-" +appendzero(date)
   document.getElementById('takeTime').innerHTML = time ;
   document.getElementById('takeDay').innerHTML =`<b>${day}</b>`  ;


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
>>>>>>> 45f6acb503f5d4b0fcc616f5d5329af12d329364
}