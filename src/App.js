import "./App.css";
import { useState, useEffect } from "react"; // Corrected here
import axios from "axios";

function App() {
  const [allData, setAllData] = useState({
    city: "London",
    country: "",
    temperature: "",
    weatherDescription: "",
    windSpeed: "",
    humidity: "",
    // Add more fields as needed
  });

  useEffect(() => {
    fetchData("London"); // Pass the default city here
  }, []); // Added dependency array to run useEffect only once

  const fetchData = async (city) => {
    try {
      const API_KEY = "9a2e8ebb42f78cbc76941ac42dc13e9b";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: result.data.main.temp,
        weatherDescription: result.data.weather[0].description,
        windSpeed: result.data.wind.speed,
        humidity: result.data.main.humidity,
        // Add more fields as needed
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherStyle = () => {
    let backgroundClass;
    
    if (allData.weatherDescription.includes("clear")) {
      backgroundClass = 'clear-sky';
    } else if (allData.weatherDescription.includes("cloud")) {
      backgroundClass = 'cloudy-sky';
    } else if (allData.weatherDescription.includes("rain")) {
      backgroundClass = 'rainy-sky';
    }
    // Add more conditions as needed
  
    return { backgroundClass };
  };
  
  const { backgroundClass } = getWeatherStyle();
  

  // the section ta in react for sections and the main tag for the main build
  // under the main we will have sections for the form and for display the weather details
  return (
    <main className={backgroundClass}>
      <section className="form-section">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData(e.target.city.value);
          }}
        >
          <input type="text" name="city" placeholder="City" />
          <button type="submit">Search</button>
        </form>
      </section>
      <section className="weather-section">
        <h1>
          {allData.city}, {allData.country}
        </h1>
        <h2>{Math.round(allData.temperature - 273.15)}°C</h2>
        <p>Weather: {allData.weatherDescription}</p>
        <p>Wind Speed: {allData.windSpeed} m/s</p>
        <p>Humidity: {allData.humidity}%</p>
        {/* Add more fields as needed */}
      </section>
    </main>
  );
}

export default App;
