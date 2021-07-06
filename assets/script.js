var apiKey = "76e901fb42a8adbcaf016cba79136568";

var submitBtn = document.querySelector("#search");

var prevSearch = document.querySelector("ul");
//Gets today and the next 5 days
let days = [];
let daysRequired = 6

for (let i = 1; i <= daysRequired; i++) {
  days.push( moment().add(i, 'days').format('L') );
}
//Empty array for cities
var cities = [];

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
            
            var name = data.name;
            var temp = (Math.round((data.main.temp- 273.15) * 9/5 + 32));
            var windSpeed = data.wind.speed+" MPH";
            var humidity = data.main.humidity+"%";
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            var queryUrlLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid="+apiKey;
            fetch(queryUrlLatLon)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                   //Makes an object to get the current and the 5 day forecast weather reports
                    var climate = {
                        day: {
                            name: name,
                            day: days[0],
                            icon: data.current.weather.icon,
                            temp: temp,
                            wind: windSpeed,
                            uv: data.current.uvi,
                            humidity: humidity
                        },
                        
                        weekTime: {
                            first:{
                                day: days[1],
                                icon: data.daily[0].weather[0].icon,
                                temp: Math.round((data.daily[0].temp.day- 273.15) * 9/5 + 32),
                                wind: data.daily[0].wind_speed+" MPH" ,
                                humidity: data.daily[0].humidity+"%"

                            },
                            second:{
                                day: days[2],
                                icon: data.daily[1].weather[0].icon,
                                temp: Math.round((data.daily[1].temp.day- 273.15) * 9/5 + 32),
                                wind: data.daily[1].wind_speed+" MPH" ,
                                humidity: data.daily[1].humidity+"%"
                            },
                            thrid:{
                                day: days[3],
                                icon: data.daily[2].weather[0].icon,
                                temp: Math.round((data.daily[2].temp.day- 273.15) * 9/5 + 32),
                                wind: data.daily[2].wind_speed+" MPH" ,
                                humidity: data.daily[2].humidity+"%"
                            },
                            fourth:{
                                day: days[4],
                                icon: data.daily[3].weather[0].icon,
                                temp: Math.round((data.daily[3].temp.day- 273.15) * 9/5 + 32),
                                wind: data.daily[3].wind_speed+" MPH" ,
                                humidity: data.daily[3].humidity+"%"
                            },
                            fifth:{
                                day: days[5],
                                icon: data.daily[4].weather[0].icon,
                                temp: Math.round((data.daily[4].temp.day- 273.15) * 9/5 + 32),
                                wind: data.daily[4].wind_speed+" MPH" ,
                                humidity: data.daily[4].humidity+"%"
                            }
                            
                        }
                    }
                    console.log(climate);
                    cities.push(climate);
                    localStorage.setItem("City", JSON.stringify(cities));
                    var weatherBlock = document.querySelector("#weatherInfo");
                    
                    var h1 = document.createElement("h1");
                    h1.textContent = climate.day.name+" "+climate.day.day+" "+climate.day.icon;
                    weatherBlock.appendChild(h1);
                })
            });
    



    
}
var mySearch = document.querySelector("#searches");
var renderSearch = function(){
    
}

var displayDasboard = function(){
    var searchedCity = JSON.parse(window.localStorage.getItem("City") || []);
    searchedCity.forEach(function(climate){
        var btn = document.createElement("button");
        btn.classList.add("btn-secondary");
        btn.classList.add("btn-lg");
        btn.classList.add("w-100");
        btn.id = climate.day.name;
        btn.style.margin = "2% 0 2% 0";
        btn.textContent = climate.day.name;
        mySearch.appendChild(btn);
    });
}

$(document).ready(function(){
 
    displayDasboard();
    
    
});
submitBtn.addEventListener("click", lookForCity);
prevSearch.addEventListener("click",function(){
    //How to get id of child button from ul
    //var myId = this.children[].id;
    //console.log(myId);

});

