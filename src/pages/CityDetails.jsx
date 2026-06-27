import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useWeather from "../hooks/useWeather";
import useUnit from "../hooks/useUnit";
import useFavorites from "../hooks/useFavorites";

const CityDetails = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const { weatherData, loading, error, searchCity } = useWeather();
  const { unit, toggleUnit } = useUnit();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    searchCity(cityName);
  }, [cityName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return null;

  const temperature =
    unit === "metric"
      ? weatherData.main.temp
      : (weatherData.main.temp * 9) / 5 + 32;
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const favorite = isFavorite(weatherData.name);

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h1>{weatherData.name}, {weatherData.sys.country}</h1>

      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
      />

      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {Math.round(temperature)} {unitSymbol}</p>
      <p>Feels like: {Math.round(
        unit === "metric"
          ? weatherData.main.feels_like
          : (weatherData.main.feels_like * 9) / 5 + 32
      )} {unitSymbol}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>Visibility: {weatherData.visibility / 1000} km</p>

      <button onClick={toggleUnit}>
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>

      <button onClick={() =>
        favorite ? removeFavorite(weatherData.name) : addFavorite(weatherData.name)
      }>
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default CityDetails;