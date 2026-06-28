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
        <div className="page">
            <button onClick={() => navigate(-1)}>← Back</button>
            <div className="card">
                <h1>{weatherData.name}, {weatherData.sys.country}</h1>

                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                />
                <p>{weatherData.weather[0].description}</p>

                <div className="stats-grid">
                    <div className="stat-box">
                        <div className="label">Temperature:</div>
                        <div className="value">{Math.round(temperature)} {unitSymbol}</div>
                    </div>
                    <div className="stat-box">
                        <div className="label">Feels like::</div>
                        <div className="value">{Math.round(
                            unit === "metric"
                                ? weatherData.main.feels_like
                                : (weatherData.main.feels_like * 9) / 5 + 32)} {unitSymbol}</div>
                    </div>
                    <div className="stat-box">
                        <div className="label">Humidity:</div>
                        <div className="value">{weatherData.main.humidity}%</div>
                    </div>
                    <div className="stat-box">
                        <div className="label">Wind Speed:</div>
                        <div className="value">{weatherData.wind.speed} m/s</div>
                    </div>
                    <div className="stat-box">
                        <div className="label">Pressure:</div>
                        <div className="value">{weatherData.main.pressure} hPa</div>
                    </div>
                    <div className="stat-box">
                        <div className="label">Visibility:</div>
                        <div className="value">{weatherData.visibility / 1000} km</div>
                    </div>
                    
                </div>

                <button onClick={toggleUnit}>
                    Switch to {unit === "metric" ? "°F" : "°C"}
                </button>

                <button onClick={() =>
                    favorite ? removeFavorite(weatherData.name) : addFavorite(weatherData.name)
                }>
                    {favorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>

            </div>

        </div>
    );
};

export default CityDetails;