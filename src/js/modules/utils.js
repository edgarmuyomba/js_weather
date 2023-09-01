async function fetchCoords(city) {
    var response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=047f8110fe6519e1f7ed701d95b7bbd0`);
    var details = await response.json();
    return {
        "lat": details[0]['lat'],
        "lon": details[0]['lon'],
        "appid": "047f8110fe6519e1f7ed701d95b7bbd0"
    }
}


function kelvinToDegrees(value, format='celsius') {
    if (format === 'celsius') {
        return truncate(value - 273.15);
    } else if (format === 'fahrenheit') {
        return truncate(((value - 273.15) * 1.8) + 32);
    } else return value
}

const truncate = (value) => (Math[value < 0 ? 'ceil' : 'floor'](value * 10)) / 10;

export { fetchCoords, kelvinToDegrees };               