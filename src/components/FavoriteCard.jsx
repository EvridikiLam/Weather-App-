const FavoriteCard = ({ data, unit, onRemove, onViewDetails }) => {
  const temperature =
    unit === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  return (
    <div className="fav-card">
      <div className="fav-card-top">
        <div className="fav-card-left">
          <h3>{data.name}, {data.sys.country}</h3>
          <p>{data.weather[0].description}</p>
        </div>
        <div className="fav-card-right">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            style={{ width: "56px", height: "56px" }}
          />
          <span className="fav-temp">{Math.round(temperature)} {unitSymbol}</span>
        </div>
      </div>
      <div className="fav-card-actions">
        <button className="btn-ghost" onClick={() => onRemove(data.name)}>
          Remove
        </button>
        <button className="btn-ghost" onClick={() => onViewDetails(data.name)}>
         View Details
        </button>
      </div>
    </div>
  );
};

export default FavoriteCard;