import { useState } from "react";
import { fetchWeatherByCity } from "../services/weatherApi";

const useWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchCity = async (city) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const data = await fetchWeatherByCity(city);
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { weatherData, loading, error, searchCity};
};

export default useWeather;