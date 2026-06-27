import {Link} from  "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/"> Homepage </Link>
            <Link to="/favorites">Favorites </Link>
        </nav>
    );
};

export default Navbar