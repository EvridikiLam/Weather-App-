import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import useWeather from "../hooks/useWeather";
import useUnit from "../hooks/useUnit";
import useFavorites from "../hooks/useFavorites";

const Home = () => {
  const { weatherData, loading, error, searchCity } = useWeather();
  const { unit, toggleUnit } = useUnit();
  const { addFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleAddFavorite = (cityName) => {
    addFavorite(cityName);
  };

  const handleViewDetails = (cityName) => {
    navigate(`/city/${cityName}`);
  };

  return (
    <div>
      <h1> Evri's Weather App</h1>
      <SearchBar onSearch={searchCity} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weatherData && (
        <WeatherCard
          data={weatherData}
          unit={unit}
          onToggleUnit={toggleUnit}
          onAddFavorite={handleAddFavorite}
          isFavorite={isFavorite(weatherData.name)}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
};

export default Home;