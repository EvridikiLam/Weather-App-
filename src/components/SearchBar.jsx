import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() === "") return;
        onSearch(city.trim());
        setCity("");
    };

    return (
        <form onSubmit={handleSubmit}> 
            <input 
                type="text"
                placeholder="Search for a city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;