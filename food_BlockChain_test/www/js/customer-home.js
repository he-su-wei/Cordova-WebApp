
let stores = document.getElementById('stores')
let photo = document.getElementById('photo')
let information = document.getElementById('information')


stores.addEventListener('click', function(){
    window.location = 'customer-storeInfo.html'
    stores.innerHTML = stores.innerHTML + `
    <button id="store" class="store">
            <div id="photo" class="photo">
                <img src="www/img/csie.png" />
            </div>
            <div id="information" class="information">
                <h3>店家名稱</h3>

                <p>環境狀態: </p>
                <p>營業狀態: </p>
            </div>
    </button>
    `
})