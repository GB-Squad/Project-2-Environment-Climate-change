import { Link, NavLink } from "react-router-dom"

function Navbar() {
return (
    <nav className="navbar">
        <NavLink to="/">
            Home
        </NavLink>
        |
        <NavLink to="/animalList">
            Animal List
        </NavLink>
        |
        <NavLink to="/addAnimal">
            Add a new animal
        </NavLink>
    </nav>
)
}

export default Navbar