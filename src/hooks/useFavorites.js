import { useEffect } from "react";

const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (cityName) => {
        setFavorites((prev) => {
            if (prev.includes(cityName)) return prev;
            return [...prev, cityName];
        });
    };

    const removeFavorite = (cityName) => {
        setFavorites((prev) => prev.filter((c) => c !== cityName));
    };
    const isFavorite = (cityName) => favorites.includes(cityName);

     return { favorites, addFavorite, removeFavorite, isFavorite };
}

export default useFavorites;