var apiKey = "76e901fb42a8adbcaf016cba79136568";

var submitBtn = document.querySelector("#search");

var prevSearch = document.querySelector("ul");
//Gets today and the next 5 days
let days = [];
let daysRequired = 6

for (let i = 0; i <= daysRequired; i++) {
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
                            icon: data.current.weather[0].icon,
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
                        
                    };
                    renderSearch(climate);
                })
               
            });
            



    
}
//Displays each data information from the fetch request using the API
var mySearch = document.querySelector("#searches");
var renderSearch = function(climate){
    var days = ["first","second","third","fourth", "fifth"];
    console.log(climate);
    cities.push(climate);
    localStorage.setItem("City", JSON.stringify(cities));
    //Hardcoded display of climates
    var weatherBlock = document.querySelector("#weatherInfo");
    var weatherBlockWeek = document.querySelector("#weatherInfoWeek");
    var h1 = document.createElement("h1");
    var img = document.createElement("img");
    var temp = document.createElement("h2");
    var wind = document.createElement("h2");
    var humidity = document.createElement("h2");
    var uv = document.createElement("h2");
    h1.textContent = climate.day.name+" "+climate.day.day;
    img.setAttribute("src", "http://openweathermap.org/img/wn/"+climate.day.icon+"@2x.png" );
    temp.textContent = "Temperature: "+climate.day.temp+"℉";
    wind.textContent = "Wind: "+climate.day.wind;
    humidity.textContent = "Humidity: "+climate.day.humidity;
    uv.textContent = "UVI: "+climate.day.uv;
    console.log(climate[1]);
   
    if(climate.day.uv <= 3){
        uv.style.backgroundColor = ("green");
    }else if(climate.day.uv>=4 && climate.day.uv<6){
        uv.style.backgroundColor = ("yellow");
    }else{
        uv.style.backgroundColor = ("red");
    }
    //Hardcoded display of climates
    weatherBlock.appendChild(h1);
    weatherBlock.appendChild(img);
    weatherBlock.appendChild(temp);
    weatherBlock.appendChild(wind);
    weatherBlock.appendChild(humidity);
    weatherBlock.appendChild(uv);
    var h3Week = document.createElement("h3");
    var imgWeek = document.createElement("img");
    var tempWeek = document.createElement("h3");
    var windWeek = document.createElement("h3");
    var humidityWeek = document.createElement("h3");
    h3Week.textContent = climate.weekTime.first.day;
    imgWeek.setAttribute("src","http://openweathermap.org/img/wn/"+climate.weekTime.first.icon+"@2x.png");
    tempWeek.textContent = climate.weekTime.first.temp;
    windWeek.textContent = climate.weekTime.first.wind;
    humidityWeek.textContent = climate.weekTime.first.humidity;
    weatherBlockWeek.appendChild(h3Week);
    weatherBlockWeek.appendChild(imgWeek);
    weatherBlockWeek.appendChild(tempWeek);
    weatherBlockWeek.appendChild(windWeek);
    weatherBlockWeek.appendChild(humidityWeek);
    //Hardcoded display of climates
    var h3Week = document.createElement("h3");
    var imgWeek = document.createElement("img");
    var tempWeek = document.createElement("h3");
    var windWeek = document.createElement("h3");
    var humidityWeek = document.createElement("h3");
    h3Week.textContent = climate.weekTime.second.day;
    imgWeek.setAttribute("src","http://openweathermap.org/img/wn/"+climate.weekTime.second.icon+"@2x.png");
    tempWeek.textContent = climate.weekTime.second.temp;
    windWeek.textContent = climate.weekTime.second.wind;
    humidityWeek.textContent = climate.weekTime.second.humidity;
    weatherBlockWeek.appendChild(h3Week);
    weatherBlockWeek.appendChild(imgWeek);
    weatherBlockWeek.appendChild(tempWeek);
    weatherBlockWeek.appendChild(windWeek);
    weatherBlockWeek.appendChild(humidityWeek);
    //Hardcoded display of climates
    var h3Week = document.createElement("h3");
    var imgWeek = document.createElement("img");
    var tempWeek = document.createElement("h3");
    var windWeek = document.createElement("h3");
    var humidityWeek = document.createElement("h3");
    h3Week.textContent = climate.weekTime.thrid.day;
    imgWeek.setAttribute("src","http://openweathermap.org/img/wn/"+climate.weekTime.thrid.icon+"@2x.png");
    tempWeek.textContent = climate.weekTime.thrid.temp;
    windWeek.textContent = climate.weekTime.thrid.wind;
    humidityWeek.textContent = climate.weekTime.thrid.humidity;
    weatherBlockWeek.appendChild(h3Week);
    weatherBlockWeek.appendChild(imgWeek);
    weatherBlockWeek.appendChild(tempWeek);
    weatherBlockWeek.appendChild(windWeek);
    weatherBlockWeek.appendChild(humidityWeek);
    //Hardcoded display of climates
    var h3Week = document.createElement("h3");
    var imgWeek = document.createElement("img");
    var tempWeek = document.createElement("h3");
    var windWeek = document.createElement("h3");
    var humidityWeek = document.createElement("h3");
    h3Week.textContent = climate.weekTime.fourth.day;
    imgWeek.setAttribute("src","http://openweathermap.org/img/wn/"+climate.weekTime.fourth.icon+"@2x.png");
    tempWeek.textContent = climate.weekTime.fourth.temp;
    windWeek.textContent = climate.weekTime.fourth.wind;
    humidityWeek.textContent = climate.weekTime.fourth.humidity;
    weatherBlockWeek.appendChild(h3Week);
    weatherBlockWeek.appendChild(imgWeek);
    weatherBlockWeek.appendChild(tempWeek);
    weatherBlockWeek.appendChild(windWeek);
    weatherBlockWeek.appendChild(humidityWeek);
    //Hardcoded display of climates
    var h3Week = document.createElement("h3");
    var imgWeek = document.createElement("img");
    var tempWeek = document.createElement("h3");
    var windWeek = document.createElement("h3");
    var humidityWeek = document.createElement("h3");
    h3Week.textContent = climate.weekTime.fifth.day;
    imgWeek.setAttribute("src","http://openweathermap.org/img/wn/"+climate.weekTime.fifth.icon+"@2x.png");
    tempWeek.textContent = climate.weekTime.fifth.temp;
    windWeek.textContent = climate.weekTime.fifth.wind;
    humidityWeek.textContent = climate.weekTime.fifth.humidity;
    weatherBlockWeek.appendChild(h3Week);
    weatherBlockWeek.appendChild(imgWeek);
    weatherBlockWeek.appendChild(tempWeek);
    weatherBlockWeek.appendChild(windWeek);
    weatherBlockWeek.appendChild(humidityWeek);
    
    displayDasboard();
}
function deleteChild() {
    var e = document.querySelector("#weatherInfo" || "#weatherInfoWeek");
    
    //e.firstElementChild can be used.
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}
var btn = document.getElementById("search").onclick = function() {
    deleteChild();
    
}
//Creates a new button from every search term 
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

