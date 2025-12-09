import { Link, NavLink } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">InventoryApp</Link>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink 
            to="/products"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Products
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/warehouses"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Warehouses
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/inventory"
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            Inventory
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
