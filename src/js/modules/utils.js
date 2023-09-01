import { displayDetails } from "./details";
import { displayToday } from "./today";

async function fetchDetails(city) {
        var response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=047f8110fe6519e1f7ed701d95b7bbd0`
        );
        var details = await response.json();
    return {
        lat: details[0]["lat"],
        lon: details[0]["lon"],
        name: `${details[0]["name"]}, ${details[0]["country"]}`,
        appid: "047f8110fe6519e1f7ed701d95b7bbd0",
    };
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

export { fetchDetails, kelvinToDegrees, capitalize, showDetails, showToday };
