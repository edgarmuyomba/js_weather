import { displayDetails } from "./details";
import { handleError } from "./utils";

const cityForm = document.querySelector('.sidebar form');

cityForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
    event.preventDefault();

    const city = cityForm.querySelector("input[type='search']");

    try {
        await displayDetails(city.value);
    } catch (error) {
        handleError();
    }

}