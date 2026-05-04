const API_KEY = "5c6eecacaa291702f76b6593139c6199";

async function getWeather() {
  let city = document.getElementById("searchInput").value;

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  let data = await response.json();

  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("description").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
    document.getElementById("wind").innerText = "Wind Speed: " + data.wind.speed + " m/s";
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("visibility").innerText = "Visibility: " + data.visibility / 1000 + " km";


}

// 5 day forecast

async function getWeather() {
  let city = document.getElementById("searchInput").value;

  // forecast api only
  let forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  let forecastData = await forecastResponse.json();

  console.log(forecastData);

  displayForecast(forecastData);
}

function displayForecast(data) {
  for (let i = 1; i <= 5; i++) {
    let dayData = data.list[(i - 1) * 8];

    document.getElementById("day" + i).innerText = "day:" +
      dayData.dt_txt.split(" ")[0];

    document.getElementById("forecastDesc" + i).innerText = "forecast:" +
      dayData.weather[0].description;

    document.getElementById("forecastTemp" + i).innerText = "Temp: " +
      dayData.main.temp + "°C";

    document.getElementById("forecastwind" + i).innerText =
      "Wind: " + dayData.wind.speed + " m/s";

    document.getElementById("humidity" + i).innerText =
      "Humidity: " + dayData.main.humidity + "%";

    document.getElementById("weatherIcon" + i).src =
      `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
  }
}