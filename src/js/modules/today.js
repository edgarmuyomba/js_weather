import { fetchCoords, kelvinToDegrees } from "./utils";
import { swapScreen } from "./switchDisplay";

const today = document.querySelector('.main');

window.onload = displayToday();

async function displayToday() {
    let today = await fetchToday();
    
    const temp = document.querySelector('.main > .temp > .value');
    temp.textContent = `${kelvinToDegrees(today['temp'])}°C`;

    const desc = document.querySelector('.main > .desc');
    desc.textContent = today['description'];
}

async function fetchToday() {
    let kampalaCoords = await fetchCoords('kampala');
    
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${kampalaCoords['lat']}&lon=${kampalaCoords['lon']}&appid=${kampalaCoords['appid']}`);
    let response = await data.json();
    return {
        "main": response['weather'][0]['main'],
        "description": response['weather'][0]['description'],
        "temp": response['main']['temp'],
    }
}

today.addEventListener('click', () => swapScreen());


// let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${kampalaCoords['lat']}&lon=${kampalaCoords['lon']}&appid=${kampalaCoords['appid']}`);