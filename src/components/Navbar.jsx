import { Link } from "react-router-dom";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav>
            <Link to="/"> Homepage </Link>
            <Link to="/favorites">Favorites </Link>
            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </nav>
    );
};

export default Navbar;