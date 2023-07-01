// require("dotenv").config();
const apiKey = "db33bb1dbccc9a3aa44a3979039d9fc7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl5days = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Hide weather and forecast sections initially
document.querySelector(".weather").style.display = "none";
document.querySelector(".nextDays").style.display = "none";


async function checkweather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);


    // console.log(data);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".nextDays").style.display = "none";
        document.body.style.height = "100vh";
    }
    else{
        var data = await response.json();
        let date = new Date()
        let month = date.getMonth();
        let longMonthName = date.toLocaleString('default', { month: 'long' });
        let day = date.getDate();
        let year = date.getFullYear();
        let weekDay = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        console.log( {month, day, year, weekDay});
        console.log(data);
        console.log(data.name);

    document.querySelector(".weekDay").textContent = `${weekDay}, ${day}th ${longMonthName} ${year}`;
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
    document.querySelector(".nextDays").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }
} 

    

    ///////////////////////////////////////////
async function checkforcast(city){
        const response = await fetch(apiUrl5days + city +`&appid=${apiKey}`);
        if(response.status == 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".nextDays").style.display = "none";
        }
        else{
            var data = await response.json();
            console.log(data);

            const fiveDayAccurate = [];


            
            data.list.forEach((element) => {
                let newDate = new Date(element.dt_txt);
                console.log(newDate.toLocaleString('en-us', {weekday: 'short'}));
                if(!fiveDayAccurate.includes(newDate.toLocaleString('en-us', {weekday: 'short'}))){
                    fiveDayAccurate.push(newDate.toLocaleString('en-us', {weekday: 'short'}))
                }
            });

            console.log(fiveDayAccurate);
            const fiveDayObjects = []
            fiveDayAccurate.forEach((day) => {
                let obj = {
                    weekDay: day,
                    icon: "",
                    minTemperature: 0,
                    maxTemperature: 0
                }
                fiveDayObjects.push(obj);
            })
            console.log(fiveDayObjects);

            data.list.forEach((elementDate) => {
                console.log(elementDate);
                let newDatex = new Date(elementDate.dt_txt).toLocaleString('en-us', {weekday: 'short'});
                // console.log(newDatex);
                fiveDayObjects.forEach((elementObj) => {
                    if(elementObj.weekDay === newDatex){
                        elementObj.maxTemperature = elementDate.main.temp_max;
                        elementObj.minTemperature = elementDate.main.temp_min;
                        elementObj.icon = elementDate.weather[0].icon;
                    }
                })
            })

            console.log(fiveDayObjects);

            

            let weekDayId = document.getElementById("weekDayId");


            const nextDays = document.getElementById("nextDays");
            nextDays.innerHTML = "";
            fiveDayObjects.forEach((element) => {
                const day = document.createElement("div");
                day.classList.add("day1");
                const weekDayH2 = document.createElement("h2");
                weekDayH2.innerText = element.weekDay;
                day.append(weekDayH2);
                const icon = document.createElement("img");
                icon.src = `http://openweathermap.org/img/w/${element.icon}.png`;
                day.append(icon);
                const min = document.createElement("h3");
                min.innerText = 'MIN';
                day.append(min);
                const minTemp = document.createElement("p");
                minTemp.innerText = Math.round(element.minTemperature) + "°C";
                day.append(minTemp);
                const max = document.createElement("h3");
                max.innerText = 'MAX';
                day.append(max);
                const maxTemp = document.createElement("p");
                maxTemp.innerText = Math.round(element.maxTemperature) + "°C";
                day.append(maxTemp);

                nextDays.append(day);
        })

        };

    }

    searchBtn.addEventListener("click", () => {
        console.log(screen.width);
        if(screen.width < 600){
            document.body.style.height = "100%";
        }
        else{
            document.body.style.height = "100vh";
        }
        checkweather(searchBox.value);
        checkforcast(searchBox.value);
        if(searchBox.value == ""){
            document.querySelector(".card").style.height = "17%";
        }else(searchBox.value != "")
        {
        //document.querySelector("body").style.height = "100%"; }
        }
    });



const nextDays = document.getElementById("nextDays");
let daydiv = document.getElementById("daydiv");

let weekDayId = document.getElementById("weekDayId");
let iconId = document.getElementById("iconId");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");



// const fiveDaysWeather = [
//     {weekDay: 'Friday', icon: '10d', weatherInfo: 'light rain', minTemperature: 15.76, maxTemperature: 19.86},
//     {weekDay: 'Saturday', icon: '04d', weatherInfo: 'overcast clouds', minTemperature: 12.39, maxTemperature: 18.5},  
//     {weekDay: 'Sunday', icon: '04d', weatherInfo: 'broken clouds', minTemperature: 14.86, maxTemperature: 22.68},
//     {weekDay: 'Monday', icon: '03d', weatherInfo: 'scattered clouds', minTemperature: 12.98, maxTemperature: 20.87},
//     {weekDay: 'Tuesday', icon: '04d', weatherInfo: 'broken clouds', minTemperature: 13.95, maxTemperature: 22.26}
// ]
