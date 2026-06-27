//communication with weatherApi
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (city) => {
    const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if(!response.ok) {
        if (response.status === 404) {
            throw new Error("City not found. Please check the name and try again");
        }
        throw new Error ("Something went wrong. Please try again later");
    }

    const data = await response.json();
    return data;
    
};