const WeatherCard = ({ data, unit, onToggleUnit, onAddFavorite }) => {
    const temperature =
        unit === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
    const unitSymbol = unit === "metric" ? "°C" : "°F";

    return (
        <div>
            <h2>{data.name}, {data.sys.country}</h2>

            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
            />

            <p>{data.weather[0].description}</p>
            <p>Temp: {Math.round(temperature)} {unitSymbol}</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind: {data.wind.speed} m/s </p>

            <button>
                Switch to {unit === "metric" ? "°C" : "°F"}
            </button>

            <button onClick={() => onAddFavorite(data.name)}>
                Add to Favorites 
            </button>
        </div>
    );
};

export default WeatherCard;