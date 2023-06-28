// require("dotenv").config();

const apiKey = "db33bb1dbccc9a3aa44a3979039d9fc7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

document.querySelector(".weather").style.display = "none";

async function checkweather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
 

    // console.log(data);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();
        console.log(data);
        console.log(data.name);

    document.querySelector(".location").textContent = data.name;
    console.log(data.name.temp);
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
  
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
       weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
} 

    searchBtn.addEventListener("click", () => {
        checkweather(searchBox.value);
    });

