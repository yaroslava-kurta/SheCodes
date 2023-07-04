let apiKey = "5a02abece27a6245bc39fc14eac7411f";
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

function currentCityTemperature(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&&units=metric`;

  if (inputValue !== "") {
    mainTitle.innerHTML = `${inputValue}`;
  }

  getWeather(apiUrl);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;

  getWeather(apiUrl);
}

function currentGeoposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;

  getWeather(apiUrl);
}

function getForecast(coordinates) {
  console.log(coordinates);

  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiKey = "o502eec173b381a6d43908d85tfb7c97";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function getWeather(apiUrl) {
  axios.get(apiUrl).then(function (response) {
    let currentTemp = Math.round(response.data.main.temp);
    let iconPreview = response.data.weather[0].icon;

    celsiusTemperature = Math.round(response.data.main.temp);

    weatherDescription.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    mainTitle.innerHTML = response.data.name;
    temperature.innerHTML = currentTemp;
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${iconPreview}@2x.png`
    );

    getForecast(response.data.coord);
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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast-temp");
  let forecastHTML = `<div class="row">`;
  let days = ["Thru", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2 forecast">
            ${day}
            <br />
            <img
              src="src/icons/partly cloudy.svg"
              alt=""
              width="30px"
              class="image"
            />
            <br />
            17/12&degC
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
renderCurrentTime();
search("Vancouver");
