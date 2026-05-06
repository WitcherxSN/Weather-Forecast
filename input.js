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
 

saveRecentCity(city);

document.getElementById("forecastday").classList.add("hidden");



document.getElementById("errorMessage").classList.add("hidden");



  document.getElementById("city").innerText = data.name + ", " + data.sys.country;
  document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("pressure").innerText = " " + data.main.pressure + " hPa";
    document.getElementById("humidity").innerText = "" + data.main.humidity + "%";
    document.getElementById("wind").innerText = " " + data.wind.speed + " m/s";
 document.getElementById("visibility").innerText = " " + data.visibility / 1000 + " km";

    document.getElementById("description").innerText = "" + data.weather[0].description;
    document.getElementById("feelslike").innerText = "Feels like: " + data.main.feels_like + "°C";
    document.getElementById("sunrise").innerText = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
    document.getElementById("sunset").innerText = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
      
      
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


document.getElementById("temp").innerText = data.main.temp + "°C";

if (data.main.temp > 37) {
  document.getElementById("temperatureAlert").innerText =
    "Extreme heat alert! Stay hydrated";
  document.getElementById("temperatureAlert").classList.remove("hidden");
} else {
  document.getElementById("temperatureAlert").classList.add("hidden");
}
 

let weatherCondition = data.weather[0].description.toLowerCase();
let weathercontainer = document.getElementById("weathercontainer");

weathercontainer.className ="h-110 w-full xl:w-1/2 bg-gradient-to-br from-blue-600 to-sky-300 rounded-2xl shadow-lg p-6 text-white";

if (weatherCondition.includes("clear")) {
  weathercontainer.classList.add("from-blue-500", "to-sky-300");

} else if (weatherCondition.includes("few clouds")) {
  weathercontainer.classList.add("from-sky-400", "to-gray-300");

} else if (weatherCondition.includes("scattered clouds")) {
  weathercontainer.classList.add("from-sky-400", "to-slate-300");

} else if (weatherCondition.includes("broken clouds")) {
  weathercontainer.classList.add("from-gray-400", "to-slate-500");

} else if (weatherCondition.includes("overcast clouds")) {
  weathercontainer.classList.add("from-gray-500", "to-slate-700");

  
} else if (weatherCondition.includes("heavy intensity drizzle")) {
  weathercontainer.classList.add(  "from-gray-800",   "to-blue-700" );
 
 
  

} else if (weatherCondition.includes("light intensity drizzle")) {
  weathercontainer.classList.add(   "from-gray-600", "to-cyan-200" );
   
 
  

} else if (weatherCondition.includes("drizzle")) {
  weathercontainer.classList.add(  "from-cyan-300", "to-blue-500");
   
    
  
  
  


} else if (weatherCondition.includes("rain")) {
  weathercontainer.classList.add("from-blue-500", "to-indigo-700");

} else if (weatherCondition.includes("thunderstorm")) {
  weathercontainer.classList.add("from-slate-700", "to-purple-900");

} else if (weatherCondition.includes("snow")) {
  weathercontainer.classList.add("from-cyan-100", "to-blue-200");

} else if (
  weatherCondition.includes("mist") ||
  weatherCondition.includes("fog") ||
  weatherCondition.includes("haze")
) {
  weathercontainer.classList.add("from-gray-200", "to-gray-400");
}



// 5 day forecast


  
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

    document.getElementById("forecastDesc" + i).innerHTML = `
  <p class="text-gray-600 text-sm text-center h-10 flex items-center justify-center">
    ${dayData.weather[0].description.charAt(0).toUpperCase() + dayData.weather[0].description.slice(1)}
  </p>
`;
    document.getElementById("forecastTemp" + i).innerText = " " +
      dayData.main.temp + "°C";

    document.getElementById("forecastwind" + i).innerHTML = `
  <div class="flex items-center justify-center gap-1">
    <img src="wind1.png" class="w-4 h-4">
    <span>${dayData.wind.speed} m/s</span>
  </div>
`;

document.getElementById("humidity" + i).innerHTML = `
  <div class="flex items-center justify-center gap-1">
    <img src="humidity1.png" class="w-4 h-4">
    <span>${dayData.main.humidity}%</span>
  </div>
`;

    if (dayData.weather[0].main === "Clear") {
      document.getElementById("weatherIcon" + i).src = "sun.png" ;
      document.getElementById("weatherIcon" + i).className = "h-16 w-16 p-1  group-hover:scale-110 transition-transform duration-300 ";

      
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

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("errorMessage").innerText =
      "Geolocation is not supported by this browser";
    document.getElementById("errorMessage").classList.remove("hidden");
  }
}

async function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  let data = await response.json();

  document.getElementById("searchInput").value = data.name;

  getWeather();
}
function showError(error) {
  document.getElementById("errorMessage").classList.remove("hidden");

  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("errorMessage").innerText =
        "Location access denied";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("errorMessage").innerText =
        "Location unavailable";
      break;
    case error.TIMEOUT:
      document.getElementById("errorMessage").innerText =
        "Location request timed out";
      break;
    default:
      document.getElementById("errorMessage").innerText =
        "Something went wrong";
  }
}
function getUSALocation() {
  document.getElementById("searchInput").value = "New York";
  getWeather();
}
function getIndiaLocation() {
  document.getElementById("searchInput").value = "New Delhi";
  getWeather();
}
function getCanadaLocation() {
  document.getElementById("searchInput").value = "Toronto";
  getWeather();
}
function getUKLocation() {
  document.getElementById("searchInput").value = "London";
  getWeather();
}
function getAustraliaLocation() {
  document.getElementById("searchInput").value = "Sydney";
  getWeather();
}

function getCountryLocation() {
  let countryselect = document.getElementById("countryselect");
  let selectedCountry = countryselect.value;
  if (selectedCountry === "us") {
    document.getElementById("searchInput").value = "New York";
    getWeather();
  } else if (selectedCountry === "in") {
    document.getElementById("searchInput").value = "New Delhi";
    getWeather();
  } else if (selectedCountry === "ca") {
    document.getElementById("searchInput").value = "Toronto";
    getWeather();
  } else if (selectedCountry === "uk") {
    document.getElementById("searchInput").value = "London";
    getWeather();
  } else if (selectedCountry === "au") {
    document.getElementById("searchInput").value = "Sydney";
    getWeather();
  } else if (selectedCountry === "fr") {
    document.getElementById("searchInput").value = "Paris";
    getWeather();
  } else if (selectedCountry === "ru") {
    document.getElementById("searchInput").value = "Moscow";
    getWeather();
  }
    else if (selectedCountry === "de") {
    document.getElementById("searchInput").value = "Berlin";
    getWeather();
  }
 else if (selectedCountry === "jp") {
    document.getElementById("searchInput").value = "Tokyo";
    getWeather();
  } else {
    document.getElementById("errorMessage").innerText = "Please select a country.";
    document.getElementById("errorMessage").classList.remove("hidden");
  } 
}


function saveRecentCity(city) {
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

  cities = cities.filter((item) => item.toLowerCase() !== city.toLowerCase());
  cities.unshift(city);

  if (cities.length > 5) {
    cities.pop();
  }

  localStorage.setItem("recentCities", JSON.stringify(cities));
}
function showRecentSearches() {
  let dropdown = document.getElementById("recentSearches");
  let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

  if (cities.length === 0) return;

  dropdown.innerHTML = "";
  dropdown.classList.remove("hidden");

  cities.forEach((city) => {
    dropdown.innerHTML += `
      <div onclick="selectCity('${city}')"
        class="p-3 hover:bg-gray-100 cursor-pointer">
        ${city}
      </div>
    `;
  });
}

function selectCity(city) {
  document.getElementById("searchInput").value = city;
  document.getElementById("recentSearches").classList.add("hidden");
  getWeather();
}
document.addEventListener("click", function (event) {
  if (!event.target.closest("#searchInput")) {
    document.getElementById("recentSearches").classList.add("hidden");
  }
});


