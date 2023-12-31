import { displayDetails } from "./details";
import { displayToday } from "./today";
import { format } from "date-fns";

async function fetchDetails(city) {
    try {
        var response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=047f8110fe6519e1f7ed701d95b7bbd0`,
            {
                mode: 'cors',
            }
        );
        var details = await response.json();
        return {
            lat: details[0]["lat"],
            lon: details[0]["lon"],
            name: `${details[0]["name"]}, ${details[0]["country"]}`,
            appid: "047f8110fe6519e1f7ed701d95b7bbd0",
        };
    } catch (error) {
        return {
            "error": "Error! Check your internet connection or the location you have entered"
        };
    }
}

async function fetchToday(city) {
    try {
        let details = await fetchDetails(city);

        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${details['lat']}&lon=${details['lon']}&appid=${details['appid']}`,
            {
                mode: 'cors',
            });
        let response = await data.json();
        return {
            "main": response['weather'][0]['main'],
            "name": details['name'],
            "description": capitalize(response['weather'][0]['description']),
            "temp": kelvinToDegrees(response['main']['temp']),
            "wind": response['wind']['speed'],
        }
    } catch (error) {
        return {
            "error": "Error! Check your internet connection or the location you have entered"
        };
    }
}

async function getfiveDays(city) {
    try {
        let details = await fetchDetails(city);

        let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${details['lat']}&lon=${details['lon']}&appid=${details['appid']}`,
            {
                mode: 'cors',
            });
        let response = await data.json();
        return response;
    } catch (error) {
        return {
            "error": "Error! Check your internet connection or the location you have entered"
        };
    }
}

function kelvinToDegrees(value, format = "celsius") {
    if (format === "celsius") {
        return truncate(value - 273.15);
    } else if (format === "fahrenheit") {
        return truncate((value - 273.15) * 1.8 + 32);
    } else return value;
}

const truncate = (value) => Math[value < 0 ? "ceil" : "floor"](value * 10) / 10;

function capitalize(str) {
    let words = str.split(" ");
    let result = "";

    words.forEach((word) => {
        word = word.toLowerCase();
        let first = word.charAt(0).toUpperCase();
        word = first + word.slice(1);
        result += ` ${word}`;
    });

    return result;
}

const today = document.querySelector(".body");
const details = document.querySelector(".details");

function showDetails(city) {
    today.setAttribute("style", "display: none");
    details.removeAttribute("style");
    displayDetails(city);
}

function showToday(city) {
    today.removeAttribute("style");
    details.setAttribute("style", "display: none");
    displayToday(city);
}

function setIcon(element, main) {
    const styles = {
        "Thunderstorm": "thunderstorm",
        "Drizzle": "drizzle",
        "Rain": "rain",
        "Snow": "snow",
        "Atmosphere": "atmosphere",
        "Clear": "clear",
        "Clouds": "clouds",

    };

    element.classList.add(styles[main]);
}

function getHighlight() {
    const time = format(Date.now(), "H:mm");
    let [hour, min] = time.split(":");
    (hour = parseInt(hour)), (min = parseInt(min));

    if (hour % 3 === 0 && min === 0) {
        return time;
    } else {
        // not exact, look for next
        hour++;
        if (hour === 24) hour = 0;
        while (hour % 3 !== 0) {
            hour++;
            if (hour === 24) hour = 0;
        }
        return `${hour}:00`;
    }
}

function handleError() {
    const error = document.querySelector('.error');

    error.removeAttribute('style');

    setTimeout(() => {
        error.setAttribute('style', 'display: none');
    }, 5000);
}

export { fetchDetails, kelvinToDegrees, capitalize, showDetails, showToday, fetchToday, setIcon, getfiveDays, getHighlight, handleError };
