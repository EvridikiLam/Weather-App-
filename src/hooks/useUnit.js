import { useState } from "react";
const useUnit = () => {
    const [unit, setUnit] = useState(() => {
        return localStorage.getItem("unit") || "metric";
    });

    const toggleUnit = () => {
        setUnit((prev) => {
            const newUnit = prev === "metric" ? "imperial" : "metric";
            localStorage.setItem("unit", newUnit);
        });

    };

return { unit, toggleUnit};

};

export default useUnit;