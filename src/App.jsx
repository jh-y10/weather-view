import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ViewWeather from "./component/ViewWeather";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "react-bootstrap";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const API_KEY = import.meta.env.VITE_APP_API_KEY;
  let cities = ["seoul", "tokyo", "paris", "new york", "beijing"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherAPI(lat, lon);
    });
  };

  const getWeatherAPI = async (lat, lon) => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setIsError(err.message);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setIsError(err.message);
    }
  };

  const cityHandle = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="main">
      {loading ? (
        <div className="wrap-content">
          <ClipLoader color="#fff" loading={loading} size={150} />
        </div>
      ) : isError ? (
        <div className="wrap-content">
          <Alert variant="danger" className="error-message">{isError}</Alert>
        </div>
      ) : (
        <div className="wrap-content">
          <ViewWeather weather={weather} />
          <WeatherButton
            cities={cities}
            city={city}
            setCity={setCity}
            cityHandle={cityHandle}
          />
        </div>
      )}
    </div>
  );
}

export default App;
