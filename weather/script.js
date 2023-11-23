const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('#searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity-val');
const windSpeed = document.querySelector('#wind-speed');
const locationNoFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "b0cb4b17f5947ac2a03d73b41f495b57";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === '404') {
        locationNoFound.style.display = "flex";
        weatherBody.style.display = "none";
    }
    else {
        locationNoFound.style.display = "none";
        weatherBody.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity} %`;
        windSpeed.innerHTML = `${weather_data.wind.speed} km/h`;

        switch (weather_data.weather[0].main) {
            case 'Clouds': weatherImg.src = "images/cloud.png";
                break;
            case 'Clear': weatherImg.src = "images/clear.png";
                break;
            case 'Rain': weatherImg.src = "images/rain.png";
                break;
            case 'Smoke': weatherImg.src = "images/mist.png";
                break;
            case 'snow': weatherImg.src = "images/snow.png";

        }

        console.log(weather_data);
    }
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value)
});
