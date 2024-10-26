import { NavLink } from "react-router-dom";
import { useUser } from "../../context/auth";
import LogoutButton from "./btns/LogoutBtn";

export default function Navbar() {
  const { user } = useUser();

  const handleNavLinkClick = () => {
    const navbarToggler = document.getElementById("navbarNavDropdown");
    if (navbarToggler) {
      navbarToggler.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="nav-link active" aria-current="page" to="/">
        <div className="navbar-brand">LifeTrack</div>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {user ? (
            <>
              <li className="nav-item">
                <LogoutButton />
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/signup"
                  onClick={handleNavLinkClick}
                >
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={handleNavLinkClick} 
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
