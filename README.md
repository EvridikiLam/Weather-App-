# Evri's Weather App

A responsive React Weather Application developed as the final project of my studies at Tech Pro Academy. The application lets users search for real-time weather data, save favorite cities, and switch between light and dark mode themes.

## Features
- Search weather by city name
- View temperature, humidity, wind speed and weather conditions of a city in real-time
- Save and Remove favorite cities (saved and persisted in local storage)
- Toggle between Celcius and Fahreneit (also saved and persisted in local storage)
-Multi-page routing 
-Unit and component tests with Vitest + React testing library

## Tech Stack

- React 18
- Vite
- React Router
- Context API
- Vitest + React Testing Library
- OpenWeatherMap API

## How to run locally
1. Clone the repository:
```bash 
    git clone https://github.com/EvridikiLam/Weather-App-.git
    cd weather-app-

2. Install dependencies:
```bash 
    npm install
```
3. Create a '.env' file in the root folder
VITE_WEATHER_API_KEY=your_api_key_here
Get a free API key at https://openweathermap.org

4. Start the development server:
```bash
    npm run dev
```
5. Open http://localhost:5173 in your browser

---

## How to run tests
```bash
npm test
```

All 13 tests should pass across 3 test files covering:
- SearchBar rendering and interactions
- WeatherCard display and unit toggling
- Home page async behavior with mocked API

---

##State management approach
I used custom hooks (`useWeather`, `useFavorites`, `useUnit`) for application state management.