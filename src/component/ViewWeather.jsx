import React from "react";
import sunIcon from "../assets/sun.png";
import cloudIcon from "../assets/cloud.png";
import rainIcon from "../assets/rain.png";

const ViewWeather = ({ weather }) => {
  let weatherIcon = "";
  if (
    weather?.weather[0].main === "Clouds" ||
    weather?.weather[0].main === "Mist"
  ) {
    weatherIcon = `${cloudIcon}`;
  } else if (weather?.weather[0].main === "Rain") {
    weatherIcon = `${rainIcon}`;
  } else {
    weatherIcon = `${sunIcon}`;
  }
  return (
    <div className="weather-area">
      <h1 aria-label="current location">{weather?.name}</h1>
      <strong>
        {Math.round(weather?.main.temp)} °C /{" "}
        {Math.round(weather?.main.temp * (5 / 9) + 32)} °F
      </strong>
      <img src={weatherIcon} alt="" />
      <p>{weather?.weather[0].description}</p>
    </div>
  );
};

export default ViewWeather;
