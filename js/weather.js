/*
Author: Moamen Ahmed
Last Modification: 2023-11-29
*/


document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "1a885f5e43e1aa53a075a6873bfd2efb";

    const coordinates = {
        latitude: 43.70,
        longitude: -79.42,
    };
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`;

    // Fetch weather data
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {

            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const temperatureCelsius = Math.round(temperature - 273.15);

            const weatherContainer = document.getElementById("weather-container");
            weatherContainer.innerHTML = `<p>${weatherDescription}</p><p>${temperatureCelsius}°C</p>`;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
});
