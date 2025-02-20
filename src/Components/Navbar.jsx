import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const shouldShowSearchBar = location.pathname !== '/';
    const shouldShowNavBar = location.pathname === '/animalList' || location.pathname === '/' || location.pathname === '/addAnimal';

    if (!shouldShowNavBar) {
        return null;
    }

    return (
        <div className="container">
            <nav className="navbar bg-body-tertiary">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/animalList">Animal List</NavLink> |
                <NavLink to="/addAnimal">Add a new animal</NavLink>

                {shouldShowSearchBar && (
                    <form className="d-flex">
                        <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                )}
            </nav>
        </div>
    );
}

export default Navbar;
