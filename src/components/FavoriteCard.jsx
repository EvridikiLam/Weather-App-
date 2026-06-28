

const FavoriteCard = ({ data, unit, onRemove, onViewDetails }) => {
    const temperature =
        unit === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
    const unitSymbol = unit === "metric" ? "°C" : "°F";

    return (
        <div className="fav-card">
            <h3>{data.name}, {data.sys.country}</h3>
            <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
            />
            <p>{Math.round(temperature)} {unitSymbol}</p>
            <p>{data.weather[0].description}</p>
            <button onClick={() => onRemove(data.name)}>Remove</button>
            <button className="btn-ghost" onClick={() => onViewDetails(data.name)}>
                View Details
            </button>
        </div>
    );
};

export default FavoriteCard;