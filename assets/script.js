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
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +"&appid=" + APIKey + "&units=imperial";
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

function citySearch(event) {
    console.log("testing")
    event.preventDefault();
    city = document.getElementById("citySearch").value.trim();
    //currentWeather(city); 
    if (city !== "") {
    cityList.push(city); 
    }
    localStorage.setItem("city",JSON.stringify(cityList));
    getApi();
}

searchForm.addEventListener("submit", citySearch);
//cityBtnEl.addEventListener("click", cityList);

