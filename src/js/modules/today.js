import { fetchDetails, kelvinToDegrees, capitalize } from "./utils";
import { showDetails } from "./utils";

const today = document.querySelector('.main');

let currentCity = "kampala";

window.onload = displayToday(currentCity);


async function displayToday(city) {
    let today = await fetchToday(city);
    
    const temp = document.querySelector('.main > .temp > .value');
    temp.textContent = `${kelvinToDegrees(today['temp'])}°C`;

    const desc = document.querySelector('.main > .desc');
    desc.textContent = capitalize(today['description']);

    const name = document.querySelector('.main .name');
    name.textContent = today['name'];
}

async function fetchToday(city) {
    let details = await fetchDetails(city);
    
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${details['lat']}&lon=${details['lon']}&appid=${details['appid']}`);
    let response = await data.json();
    return {
        "main": response['weather'][0]['main'],
        "name": details['name'],
        "description": response['weather'][0]['description'],
        "temp": response['main']['temp'],
    }
}

today.addEventListener('click', () => showDetails(currentCity));

export { displayToday };