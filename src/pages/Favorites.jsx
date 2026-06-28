import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteCard from "../components/FavoriteCard";
import useFavorites from "../hooks/useFavorites";
import useUnit from "../hooks/useUnit";
import { fetchWeatherByCity } from "../services/weatherApi";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { unit, toggleUnit } = useUnit();
  const [weatherDataList, setWeatherDataList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        favorites.map((city) => fetchWeatherByCity(city))
      );
      setWeatherDataList(results);
    };

    if (favorites.length > 0) fetchAll();
    else setWeatherDataList([]);
  }, [favorites]);

  return (
    <div className="page">
      <h1>Favorite Cities</h1>

      {weatherDataList.length === 0 && (
        <p>No favorites yet. Search for a city and add it!</p>
      )}

      {weatherDataList.map((data) => (
        <FavoriteCard 
          key={data.id}
          data={data}
          unit={unit}
          onRemove={removeFavorite}
          onViewDetails={() => navigate(`/city/${data.name}`)}
        />
      ))}

      {weatherDataList.length > 0 && (
        <button onClick={toggleUnit}>
          Switch to {unit === "metric" ? "°F" : "°C"}
        </button>
      )}
    </div>
  );
};

export default Favorites;