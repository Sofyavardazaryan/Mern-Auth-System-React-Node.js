import { NavLink } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}

export default Navbar;
