import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, city, cityHandle }) => {
  return (
    <div className="button-area">
      <Button
        variant={`${
          city === null ? "primary active-button" : "primary normal-button"
        }`}
        onClick={() => cityHandle("current")}
      >
        current location
      </Button>
      {cities.map((item) => (
        <Button
          variant={`${
            city === item ? "primary active-button" : "primary normal-button"
          }`}
          key={item}
          onClick={() => cityHandle(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
