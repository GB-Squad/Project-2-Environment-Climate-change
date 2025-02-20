import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar({ searchTerm, onSearchChange }) {
    const location = useLocation();
    const shouldShowSearchBar = location.pathname === '/animalList';

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
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
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
