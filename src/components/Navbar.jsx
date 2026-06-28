import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <Link to="/"> Homepage </Link>
            <Link to="/favorites">Favorites </Link>
            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </nav>
    );
};

export default Navbar;