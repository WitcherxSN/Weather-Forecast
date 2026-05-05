const API_KEY = "5c6eecacaa291702f76b6593139c6199";
 
  
async function getWeather() {

  
  let city = document.getElementById("searchInput").value;

  

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  let data = await response.json();

  if (data.cod !== 200) {
  document.getElementById("errorMessage").innerText = "Please enter a valid city name.";
  document.getElementById("errorMessage").classList.remove("hidden");
  return;
}

document.getElementById("errorMessage").classList.add("hidden");



  document.getElementById("city").innerText = data.name + ", " + data.sys.country;
  document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("pressure").innerText = " " + data.main.pressure + " hPa";
    document.getElementById("humidity").innerText = "" + data.main.humidity + "%";
    document.getElementById("wind").innerText = " " + data.wind.speed + " m/s";
    document.getElementById("description").innerText = "" + data.weather[0].description;
    document.getElementById("feelslike").innerText = "Feels like: " + data.main.feels_like + "°C";
    document.getElementById("date").innerText = new Date(data.dt * 1000)
  .toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });



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

  showForecast();
}

function displayForecast(data) {
  for (let i = 1; i <= 5; i++) {
    let dayData = data.list[(i - 1) * 8];

    document.getElementById("day" + i).innerText =
  new Date(dayData.dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric"
  });

    document.getElementById("forecastDesc" + i).innerText = "" +
      dayData.weather[0].description.charAt(0).toUpperCase() + dayData.weather[0].description.slice(1);

    document.getElementById("forecastTemp" + i).innerText = " " +
      dayData.main.temp + "°C";

    document.getElementById("forecastwind" + i).innerHTML =
  `<img src="wind1.png" class="w-5 h-5 inline-block mr-1">
   ${dayData.wind.speed} m/s`;

    document.getElementById("humidity" + i).innerHTML =
  `<img src="humidity1.png" class="w-5 h-5 inline-block mr-1">
   ${dayData.main.humidity}%`;

    if (dayData.weather[0].main === "Clear") {
      document.getElementById("weatherIcon" + i).src = "sun.png" ;
      document.getElementById("weatherIcon" + i).className = "h-25 w-25 p-2  group-hover:scale-110 transition-transform duration-300 ";

      
    } else {
      document.getElementById("weatherIcon" + i).src =
        `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
    }
  }
}


function changetofahrenheit() {
  document.getElementById("fahrenheitButton").classList.add("bg-blue-600");
  document.getElementById("fahrenheitButton").classList.remove("bg-gray-400");

  document.getElementById("celsiusButton").classList.add("bg-gray-400");
  document.getElementById("celsiusButton").classList.remove("bg-blue-600");
 let tempElement = document.getElementById("temp");

  if (tempElement.innerText.includes("°F")) return;

  let tempValue = parseFloat(tempElement.innerText);
  let newTemp = (tempValue * 9) / 5 + 32;

  tempElement.innerText = newTemp.toFixed(1) + "°F";
 
}

function changetocelsius() {
  document.getElementById("celsiusButton").classList.add("bg-blue-600");
  document.getElementById("celsiusButton").classList.remove("bg-gray-400");

  document.getElementById("fahrenheitButton").classList.add("bg-gray-400");
  document.getElementById("fahrenheitButton").classList.remove("bg-blue-600");
let tempElement = document.getElementById("temp");

  if (tempElement.innerText.includes("°C")) return;

  let tempValue = parseFloat(tempElement.innerText);
  let newTemp = ((tempValue - 32) * 5) / 9;

  tempElement.innerText = newTemp.toFixed(1) + "°C";
  
}

function showForecast() {
  document.getElementById("forecast").style.display = "flex";
  document.getElementById("placeholderBox").style.display = "none";

}