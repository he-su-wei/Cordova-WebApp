console.log(localStorage.address);
function check(){
    if(localStorage.address==undefined){
        window.location.href='firstone-login.html';
    }
    else{
        window.location.href='store-login.html';
    }
};
    
