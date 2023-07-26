var citySearchEl = document.querySelector("#citySearch");
var cityHistory = document.querySelector("#cityList");
var weatherEl = document.querySelector("#weather");
//var forecastEl = document.querySelector("#forecast");
var searchForm = document.querySelector("#search-form")
var APIKey = "bde14580c0f6d91971c813d677b4b5ae";
var cityList = [];
var currentDay = dayjs().format('dddd, MMMM D YYYY');
var currentTime = dayjs().format('h:mm A');

//https://api.openweathermap.org/data/2.5/weather?q=phoenix&appid=bde14580c0f6d91971c813d677b4b5ae

//var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`

function weather(city) {
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentWeather(data);

        })
};

function forecast(city) {
    console.log(city);
    clearForecast();
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // var cityLon = data.coord.lon;
    // var cityLat = data.coord.lat;

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            weatherForecast(data);
        })

}

// Load the city search history from localStorage on page load
window.addEventListener("load", function () {
    var storedCityList = JSON.parse(localStorage.getItem("city"));
    if (Array.isArray(storedCityList)) {
        cityList = storedCityList;
        updateCitySearchHistory();
    }
});

function citySearch(event) {
    event.preventDefault();
    let city = citySearchEl.value.trim();

    // Check if the city is not empty and not already in the list before adding
    if (city !== "" && !cityList.includes(city)) {
        cityList.push(city);
        localStorage.setItem("city", JSON.stringify(cityList));
        updateCitySearchHistory();
        console.log(city);
        weather(city);
        forecast(city);
    }

    // Clear the input field after the form submission
    document.getElementById("citySearch").value = "";
}

function updateCitySearchHistory() {
    // Clear the existing content of the city history list so that there are no duplicates
    cityHistory.innerHTML = "";

    cityList.forEach(function (city) {
        var listItem = document.createElement("li");

        // Create a button for each city and set its text content to the city name
        var cityButton = document.createElement("button");
        cityButton.textContent = city;
        cityButton.classList.add("cityList");
        listItem.appendChild(cityButton);

        // Add click event listener to the city button
        cityButton.addEventListener("click", function () {
            // On button click, fetch weather and forecast data for the selected city
            let city = cityButton.textContent;
            weather(city);
            forecast(city);
        });

        cityHistory.appendChild(listItem);
    });
}

function currentWeather(data) {
    //console.log(data);
    var weather = document.querySelector("#weather");
    // Clear the existing weather information before displaying new data
    var weatherContainer = document.querySelector(".container-weather");
    weatherContainer.setAttribute("style", "display: flex;");

    weather.innerHTML = "";

    var cityNameEl = document.createElement("h2");
    cityNameEl.textContent = data.name;

    var currentDayEl = document.createElement("h2");
    currentDayEl.textContent = currentDay;

    var weatherIconEl = document.createElement("img");
    var weatherIconCode = data.weather[0].icon;
    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/w/" + weatherIconCode + ".png");
    weatherIconEl.setAttribute("alt", "Weather Icon");

    var temperatureEl = document.createElement("p");
    temperatureEl.textContent = "Temperature: " + data.main.temp + " °F";

    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

    var windSpeedEl = document.createElement("p");
    windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + " mph";

    // Append all elements to the weather div
    weather.appendChild(cityNameEl);
    weather.appendChild(currentDayEl);
    weather.appendChild(weatherIconEl);
    weather.appendChild(temperatureEl);
    weather.appendChild(humidityEl);
    weather.appendChild(windSpeedEl);
}

function weatherForecast(data) {
    console.log(data);
    var forecastContainer = document.querySelector(".container-forecast");
    forecastContainer.setAttribute("style", "display: flex;");

    //forecast.innerHTML = "";

    for (var i = 0; i <= 5; i++) {
        if (i === 0) {
            var forecast = document.querySelector("#forecast1");
        }
        else if (i === 1) {
            var forecast = document.querySelector("#forecast2");
        }
        else if (i === 2) {
            var forecast = document.querySelector("#forecast3");
        }
        else if (i === 3) {
            var forecast = document.querySelector("#forecast4");
        }
        else if (i === 4) {
            var forecast = document.querySelector("#forecast5");
        }

        var forecastData = data.list[i * 8];

        var cityNameEl = document.createElement("h2");
        cityNameEl.textContent = data.name;

        var forecastDate = dayjs().add(i, 'day').format('MMMM D'); // Calculate the forecast date for each day
        var currentDayEl = document.createElement("h2");
        currentDayEl.textContent = forecastDate;

        var weatherIconEl = document.createElement("img");
        var forecastIcon = forecastData.weather[0].icon;
        weatherIconEl.setAttribute("src", "https://openweathermap.org/img/w/" + forecastIcon + ".png");
        weatherIconEl.setAttribute("alt", "Weather Icon");

        var temperatureEl = document.createElement("p");
        temperatureEl.textContent = "Temperature: " + forecastData.main.temp + " °F" + i;

        var humidityEl = document.createElement("p");
        humidityEl.textContent = "Humidity: " + forecastData.main.humidity + "%" + i;

        var windSpeedEl = document.createElement("p");
        windSpeedEl.textContent = "Wind Speed: " + forecastData.wind.speed + " mph" + i;

        // Append all elements to the forecast div
        forecast.appendChild(cityNameEl);
        forecast.appendChild(currentDayEl);
        forecast.appendChild(weatherIconEl);
        forecast.appendChild(temperatureEl);
        forecast.appendChild(humidityEl);
        forecast.appendChild(windSpeedEl);
    }
}
function clearForecast() {
    // Clear the existing forecast data by setting the innerHTML of each forecast element to an empty string
    document.querySelector("#forecast1").innerHTML = "";
    document.querySelector("#forecast2").innerHTML = "";
    document.querySelector("#forecast3").innerHTML = "";
    document.querySelector("#forecast4").innerHTML = "";
    document.querySelector("#forecast5").innerHTML = "";
  }
searchForm.addEventListener("submit", citySearch);
//cityButton.addEventListener("click", cityList);

