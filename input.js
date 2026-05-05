const API_KEY = "5c6eecacaa291702f76b6593139c6199";

async function getWeather() {
  let city = document.getElementById("searchInput").value;

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  let data = await response.json();

  document.getElementById("city").innerText = data.name + ", " + data.sys.country;
  document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("pressure").innerText = " " + data.main.pressure + " hPa";
    document.getElementById("humidity").innerText = "" + data.main.humidity + "%";
    document.getElementById("wind").innerText = " " + data.wind.speed + " m/s";
    document.getElementById("description").innerText = "" + data.weather[0].description;
    document.getElementById("feelslike").innerText = "Feels like: " + data.main.feels_like + "°C";
    document.getElementById("date").innerText = new Date().toLocaleDateString();

if (data.weather[0].main === "Clear") {
  document.getElementById("weatherIcon").src = "sun.png";
  document.getElementById("weatherIcon").className = "h-40 w-40 group-hover:scale-110 transition-transform duration-300";
} else {
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
}

 document.getElementById("visibility").innerText = " " + data.visibility / 1000 + " km";




// 5 day forecast


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

    if (dayData.weather[0].main === "Clear") {
      document.getElementById("weatherIcon" + i).src = "sun.png" ;
      document.getElementById("weatherIcon" + i).className = "h-20 w-20 p-2  group-hover:scale-110 transition-transform duration-300 ";

      
    } else {
      document.getElementById("weatherIcon" + i).src =
        `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
    }
  }
}