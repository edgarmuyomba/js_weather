import { showToday } from "./utils";
import { format } from "date-fns";

const back = document.querySelector('.header > .back');

let currentCity = "Kampala";

// let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${kampalaCoords['lat']}&lon=${kampalaCoords['lon']}&appid=${kampalaCoords['appid']}`);

function displayDetails(city) {
    currentCity = city;
    setDateTime();
    // setDetails(main);
    // setHours();
    // setDays();
}

function setDateTime() {
    const date = format(Date.now(), "d, MMMM, yyyy");
    const time = format(Date.now(), "HH:mm");

    const dateDiv = document.querySelector('.details .date');
    const timeDiv = document.querySelector('.details .time');

    dateDiv.textContent = date;
    timeDiv.textContent = time;
}



back.addEventListener('click', () => showToday(currentCity));

export { displayDetails };