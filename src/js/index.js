import {userLocation, geo} from './geo.js'


const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend', `
    <header>
    <a href="./" id="cloud" title="home"><h2 class="title">c l o u d</h2></a>
    <span>a <a href="https://ryeonpc.com/" target="_blank">ryeonpc</a> project.</span>
    </header>
    <form method="preventDefault();">
        <input placeholder="search your location" maxlength="50"></input>
        <button>Submit</button>
    </form>
    <div id="location-list"></div>
    <div id="sunrise-sunset-io">Powered by <a href="https://sunrisesunset.io/" target="_blank">SunriseSunset.io</a></div>
`)


const input = document.querySelector('input')
const button = document.querySelector('button')

button.addEventListener('click', (e) => {
    document.querySelector('#location-list').innerHTML = ``
    e.preventDefault();
    geo(input.value)
    input.value = ''
})
