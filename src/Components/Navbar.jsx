import { Link, NavLink, useLocation } from "react-router-dom";

function Navbar({ searchTerm, onSearchChange }) {
    const location = useLocation();
    const shouldShowSearchBar = location.pathname === '/animalList';

    return (
        
            <nav id="main-navbar">
                <NavLink to="/">Home</NavLink> 
                <NavLink to="/animalList">Animal List</NavLink> 
                <NavLink to="/addAnimal">Add new animal</NavLink>

                {shouldShowSearchBar && (
                    <form className="d-flex">
                        <input
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />

                    </form>
                )}
            </nav>
      
    );
}

export default Navbar;
