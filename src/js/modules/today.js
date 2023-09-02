import { fetchToday, showDetails, setIcon, handleError } from "./utils";

const today = document.querySelector('.main');

let currentCity = "kampala";

window.onload = displayToday(currentCity);


async function displayToday(city) {
    let today = await fetchToday(city);

    if (today['error']) {
        handleError();
    } else {

        const temp = document.querySelector('.main > .temp > .value');
        temp.textContent = `${today['temp']}°C`;

        const desc = document.querySelector('.main > .desc');
        desc.textContent = today['description'];

        const name = document.querySelector('.main .name');
        name.textContent = today['name'];

        const icon = document.querySelector('.main .icon');
        setIcon(icon, today['main']);
    }
}

today.addEventListener('click', () => showDetails(currentCity));

export { displayToday };