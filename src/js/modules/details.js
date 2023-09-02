import { showToday, fetchToday, setIcon, getfiveDays, kelvinToDegrees, getHighlight } from "./utils";
import { format } from "date-fns";

const back = document.querySelector('.header > .back');

let currentCity = "Kampala";

async function displayDetails(city) {
    currentCity = city;
    setDateTime();
    setDetails();

    let fiveDays = await getfiveDays(currentCity);
    setHours(fiveDays);
    setDays(fiveDays);
}

function setDateTime() {
    const date = format(Date.now(), "d, MMMM, yyyy");
    const time = format(Date.now(), "HH:mm");

    const dateDiv = document.querySelector('.details .date');
    const timeDiv = document.querySelector('.details .time');

    dateDiv.textContent = date;
    timeDiv.textContent = time;
}

async function setDetails() {
    let today = await fetchToday(currentCity);

    const desc = document.querySelector('.main-details > .desc');
    desc.textContent = today['description'];

    const temp = document.querySelector('.details > .sidebar > .temp');
    temp.textContent = `${today['temp']}°C`;

    const wind = document.querySelector('.details > .sidebar .speed');
    wind.textContent = `${today['wind']} ms`;

    const icon = document.querySelector('.main-details > .icon');
    setIcon(icon, today['main']);
}

function setHours(fiveDays) {
    const footer = document.querySelector('.details > .footer');

    footer.innerHTML = '';

    let hourly = fiveDays["list"].slice(0, 8);

    let highlight = getHighlight();

    hourly.forEach((hour) => {
        let time = new Date(hour['dt'] * 1000);
        let det = {
            "time": format(time, "H:mm"),
            "main": hour['weather'][0]['main'],
            "temp": hour['main']['temp'],
        };
        let newHour = createHour(det);
        if (highlight === det['time']) newHour.classList.add('today');
        footer.appendChild(newHour);
    })

}

function createHour(det) {
    const hour = document.createElement('div');
    hour.classList.add('hour');

    const time = document.createElement('div');
    time.classList.add('time');
    time.textContent = det['time'];
    hour.appendChild(time);

    const hr = document.createElement('div');
    hr.classList.add('hr');
    hour.appendChild(hr);

    const icon = document.createElement('div');
    icon.classList.add('icon');

    const image = document.createElement('div');
    image.classList.add('image');
    setIcon(image, det['main']);
    icon.appendChild(image);

    hour.appendChild(icon);

    const temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = `${kelvinToDegrees(det['temp'])}°C`;
    hour.appendChild(temp);

    return hour;
}

function setDays(fiveDays) {

    let days = document.querySelector('.details > .sidebar > .days');

    days.innerHTML = '';

    let hours = fiveDays['list'];

    hours.forEach((hour) => {
        let datetime = new Date(hour['dt'] * 1000);
        let time = format(datetime, "H:mm");
        if (time === '6:00') {
            let det = {
                "date": format(datetime, "EEEE d, MMMM"),
                "temp": hour['main']['temp'],
                "main": hour['weather'][0]['main'],
                "desc": hour['weather'][0]['description'],
            };
            days.appendChild(createDay(det));
        }
    })
}

function createDay(det) {
    let day = document.createElement('div');
    day.classList.add('day');

    let icon = document.createElement('div');
    icon.classList.add('icon');

    let image = document.createElement('div');
    image.classList.add('image');
    setIcon(image, det['main']);
    icon.appendChild(image);

    day.appendChild(icon);

    let date = document.createElement('div');
    date.classList.add('date');
    date.textContent = det['date'];
    day.appendChild(date);

    let desc = document.createElement('div');
    desc.classList.add('desc');
    desc.textContent = det['desc'];
    day.appendChild(desc);

    let temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = `${kelvinToDegrees(det['temp'])}°C`;
    day.appendChild(temp);

    return day;
}


back.addEventListener('click', () => showToday(currentCity));

export { displayDetails };