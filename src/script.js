let apiKey = "o502eec173b381a6d43908d85tfb7c97";
let temperature = document.querySelector("#temperature-value");
let yourCity = document.querySelector("#search-city-button");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let mainTitle = document.querySelector("#main-title");
let current = document.querySelector("#current-button");
let weatherDescription = document.querySelector("#weather-description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let icon = document.querySelector("#icon");
let date = document.querySelector("#current-time");
let celsiusTemperature = null;
let citiesList = document.querySelector("#popular-cities");

function currentCityTemperature(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search-city").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputValue}&key=${apiKey}&units=metric`;

  if (inputValue !== "") {
    mainTitle.innerHTML = `${inputValue}`;
  }

  getWeather(apiUrl);
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  getWeather(apiUrl);
}

function renderQuickSearchWeather(event) {
  let cityValue = event.target.textContent;

  search(cityValue);
}

function currentGeoposition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "o502eec173b381a6d43908d85tfb7c97";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;

  getWeather(apiUrl);
}

function getForecast(coordinates) {
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let apiKey = "o502eec173b381a6d43908d85tfb7c97";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function getWeather(apiUrl) {
  axios.get(apiUrl).then(function (response) {
    let currentTemp = Math.round(response.data.temperature.current);
    let iconPreview = response.data.condition.icon;

    celsiusTemperature = Math.round(response.data.temperature.current);

    weatherDescription.innerHTML = response.data.condition.description;
    humidity.innerHTML = response.data.temperature.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    mainTitle.innerHTML = response.data.city;
    temperature.innerHTML = currentTemp;
    icon.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconPreview}.png`
    );

    getForecast(response.data.coordinates);
  });
}

function renderCurrentPositionTemp(event) {
  navigator.geolocation.getCurrentPosition(currentGeoposition);
}

function renderCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednedsay",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinutes = now.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  date.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
}

function renderTemperature(event) {
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);

  if (event.target.id === "fahrenheit") {
    temperature.innerHTML = fahrenheitTemperature;
    fahrenheit.style.color = "white";
    celsius.style.color = "rgb(66, 67, 114)";
  } else {
    temperature.innerHTML = celsiusTemperature;
    fahrenheit.style.color = "rgb(66, 67, 114)";
    celsius.style.color = "white";
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast-temp");
  let forecastHTML = `<div class="row">`;

  forecast.shift();

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2 forecast">
            ${formatDay(forecastDay.time)}
            <br />
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              alt=""
              width="60px"
              class="image"
            />
            <br />
            ${Math.round(forecastDay.temperature.maximum)}/${Math.round(
        forecastDay.temperature.minimum
      )}&degC
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

yourCity.addEventListener("click", currentCityTemperature);
celsius.addEventListener("click", renderTemperature);
fahrenheit.addEventListener("click", renderTemperature);
current.addEventListener("click", renderCurrentPositionTemp);
citiesList.addEventListener("click", renderQuickSearchWeather);
renderCurrentTime();
search("Vancouver");
