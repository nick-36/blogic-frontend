import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function Navbar(props) {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <nav>
        <div className="nav-left">
          <p className="brandLogo">blogic</p>
        </div>
        <div className="nav-center">
          <ul className="navItems">
            <li className="navItem">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="/" className="link">
                About
              </Link>
            </li>
            <li className="navItem">
              <Link to="/" className="link">
                Contact
              </Link>
            </li>
            {user && (
              <li className="navItem">
                <Link to="/write" className="link">
                  Write
                </Link>
              </li>
            )}
            {user && (
              <li className="navItem">
                <Link to="/login" className="link" onClick={handleLogout}>
                  Log out
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="nav-right">
          {user && (
            <>
              <Link className="link" to="/settings">
                {user.profilePic ? (
                  <img
                    className="userAvatar"
                    src={user.profilePic}
                    alt="user "
                  />
                ) : (
                  <img
                    className="userAvatar"
                    src="https://www.pngfind.com/pngs/m/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"
                    alt="user "
                  />
                )}
              </Link>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input className="navSearch" type="text" placeholder="Search" />
            </>
          )}
          {!user && (
            <>
              <Link className="link" to="/login">
                Login
              </Link>
              <Link className="link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
