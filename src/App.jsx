import { useState } from "react";

function App() {
  const[city, setCity] = useState("");
  const[weather, setWeather] = useState(null);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");

  const search = async () => {
    if(city === "") {
      alert("Please enter a city");
      return;
    }
    const API_KEY = "bcd4047aacc546a0284ee4b7f702a0ff";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    if(data.cod === "404") {
      setError("❌ City not found")
      setWeather(null);
      return;
    }
    setWeather(data);
    setCity("");
    setError("");
  }
  let iconurl = "";

  if (weather) {
    const iconCode = weather.weather[0].icon;
    iconurl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
  const currentDate = new Date();
  const dateString = currentDate.toDateString();
  const timeString = currentDate.toLocaleTimeString();
  return(
    <div className="app">
      <div className="header">
        <h1>Weather Dashboard</h1>
      </div>
      <div className="sub-content">
        <input placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} 
          onKeyDown={(e) => {
          if(e.key === "Enter") {
            search();
          }
        }}></input>
        <button onClick={search}> Search </button>
      </div>
      { (loading || error || weather) && (
        <div className="main-content">
          {loading && <h2>Loading....</h2>}
          {weather && (
            <div>
              <h2>📅 {dateString}</h2>
              <h2>🕒 {timeString}</h2>
              <h2>📍 City: {weather.name}</h2>
              <h2>🌡️ Temperature: {weather.main.temp}°C</h2>
              <h2>☁️ Condition: {weather.weather[0].main}</h2>
              <h2>💨 Wind Speed: {weather.wind.speed} m/s</h2>
              <img src={iconurl} alt="Weather Icon" />
            </div>
          )}
          {error && <h2 className="error">{error}</h2>}
        </div>)
      }
    </div>
  );
}
export default App;
