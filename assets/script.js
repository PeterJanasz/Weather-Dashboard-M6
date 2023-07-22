var citySearchEl = document.querySelector("#search");
var cityBtnEl = document.querySelector("#cityList");
var weatherEl = document.querySelector("#weather");
var forecastEl = document.querySelector("#forecast");
var APIKey = "537a4ff57216c67ad192f0ed307f8c0e";
var city;
var savedSearches = [];
var currentDay = dayjs().format('dddd, MMMM D YYYY');
var currentTime = dayjs().format('h:mm A');


function getApi() {
    var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(cityURL)
        .then(function (response) {
         return response.json();
        })
        .then(function (data) {
         console.log(data);
         forecast(lat, lon);
    
        })
};

function forecast(lat, lon){
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=57&lon=-2.15&appid=" + APIkey + "&units=imperial"

    fetch(forecastURL)
        .then(function (response) {
         return response.json();
        })
        .then(function (data) {
         console.log(data);
         var cityLon = response.coord.lon;
         var cityLat = response.coord.lat;
        

        })

}
citySearchEl.addEventListener("submit", citySearch);
cityBtnEl.addEventListener("click", cityList);

getApi();