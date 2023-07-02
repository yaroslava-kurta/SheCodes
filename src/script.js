let apiKey = "5a02abece27a6245bc39fc14eac7411f";
let temperature = document.querySelector("#temperature-value");
let yourCity = document.querySelector("#search-city-button");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let mainTitle = document.querySelector("#main-title");
let current = document.querySelector("#current-button");
let icon = document.querySelector("#icon");

function currentCityTemperature(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&&units=metric`;

  if (inputValue !== "") {
    mainTitle.innerHTML = `${inputValue}`;
  }

  axios.get(apiUrl).then(function (response) {
    let weatherDescription = document.querySelector("#weather-description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let currentTemp = Math.round(response.data.main.temp);

    weatherDescription.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    temperature.innerHTML = currentTemp;
  });
}

function currentGeoposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(function (response) {
    mainTitle.innerHTML = response.data.name;
    let currentTemp = Math.round(response.data.main.temp);
    temperature.innerHTML = currentTemp;
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
  let currentMinutes = now.getMinutes();
  let date = document.querySelector("#current-time");
  date.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
}

function renderTemperature(event) {
  let celsiusTemperature = 20;
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

yourCity.addEventListener("click", currentCityTemperature);
celsius.addEventListener("click", renderTemperature);
fahrenheit.addEventListener("click", renderTemperature);
current.addEventListener("click", renderCurrentPositionTemp);
renderCurrentTime();
