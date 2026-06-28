const WeatherCard = ({ data, unit, onToggleUnit, onAddFavorite }) => {
    const temperature =
        unit === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
    const unitSymbol = unit === "metric" ? "°C" : "°F";

    return (
        <div className="card">
            <h2>{data.name}, {data.sys.country}</h2>

            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
            />
            <div className="stats-grid">
                <div className="stat-box">
                    <div className="label">Temperature</div>
                    <div className="value">{Math.round(temperature)} {unitSymbol}</div>
                </div>
                <div className="stat-box">
                    <div className="label">Humidity</div>
                    <div className="value">{data.main.humidity}%</div>
                </div>
                <div className="stat-box">
                    <div className="label">Wind</div>
                    <div className="value">{data.wind.speed} m/s</div>
                </div>
            </div>

            <button className="btn-ghost" onClick={onToggleUnit}>
                Switch to {unit === "metric" ? "°F" : "°C"}
            </button>

            <button className="btn-solid" onClick={() => onAddFavorite(data.name)}>
                Add to Favorites
            </button>
        </div>
    );
};

export default WeatherCard;