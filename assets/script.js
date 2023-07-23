var citySearchEl = document.querySelector("#citySearch");
var cityHistory = document.querySelector("#cityList");
var weatherEl = document.querySelector("#weather");
var forecastEl = document.querySelector("#forecast");
var searchForm = document.querySelector("#search-form")
var APIKey = "bde14580c0f6d91971c813d677b4b5ae";
var city;
var cityList = [];
var currentDay = dayjs().format('dddd, MMMM D YYYY');
var currentTime = dayjs().format('h:mm A');

function getApi() {
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            forecast(city);

            currentWeather(city);
        })
};

function forecast(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    // var cityLon = data.coord.lon;
    // var cityLat = data.coord.lat;

    fetch(forecastURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        })

}

function currentWeather(data) {

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
    city = document.getElementById("citySearch").value.trim();
  
    // Check if the city is not empty and not already in the list before adding
    if (city !== "" && !cityList.includes(city)) {
      cityList.push(city);
      localStorage.setItem("city", JSON.stringify(cityList));
      updateCitySearchHistory();
      getApi();
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
      cityButton.classList.add("search-history-item");
      listItem.appendChild(cityButton);
  
      // Add click event listener to the city button
      cityButton.addEventListener("click", function () {
        // On button click, fetch weather data for the selected city
        city = cityButton.textContent;
        getApi();
      });
  
      cityHistory.appendChild(listItem);
    });
  }

searchForm.addEventListener("submit", citySearch);
cityBtnEl.addEventListener("click", cityList);

