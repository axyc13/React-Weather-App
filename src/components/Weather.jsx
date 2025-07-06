import React, { useState, useRef } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,

    }
    const search = async (city) => {
        if (city === "") {
            alert("Enter A City Name Please");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }
            
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clearIcon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                country: data.sys.country
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather");
        }
    }

  return (
    <div className = "weather">
        <div className = "searchBar">
            <input ref = {inputRef} type = "text" placeholder = "Search.." onKeyDown={(e) => e.key === 'Enter' && search(inputRef.current.value)}/>
            <img src = {searchIcon} alt = "Search Icon" onClick = {()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt="Clear Weather" className = "weatherIcon" />
        <p className = "temperature">{weatherData.temperature}°C</p>
        <p className = "location">{weatherData.location} ({weatherData.country})</p>
        <div className = "weatherData">
            <div className = "col">
                <img src={humidityIcon} alt="Humidity Icon" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className = "col">
                <img src={windIcon} alt="Wind Icon" />
                <div>
                    <p>{weatherData.windSpeed}Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
    </div>
  )
}

export default Weather
