import "./Navbar.css";
import React from "react";
import Temple from "../assets/temple.svg";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="project logo" />
          <span>Project</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        <li>
          {user && !isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {user && isPending && (
            <button className="btn" disabled>
              Loging out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
