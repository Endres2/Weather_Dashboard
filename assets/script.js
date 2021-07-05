var apiKey = "76e901fb42a8adbcaf016cba79136568";

var submitBtn = document.querySelector("#search");


function lookForCity(event){
    event.preventDefault();
    var searchValue =document.querySelector("#city").value;
   getWeather(searchValue);
}
function getWeather(city){
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    fetch(queryUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.name);
            console.log(Math.round((data.main.temp- 273.15) * 9/5 + 32));
            console.log(data.wind.speed+" MPH");
            console.log(data);
            console.log(data);
        })
    
}

submitBtn.addEventListener("click", lookForCity);