import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import React from "react";
import Avater from "./Avater";

const Sidebar = () => {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          {user && <Avater src={user.photoURL} />}
          <p>Hey user</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="Dashboard Icon" />
                <span>DashBoard</span>
              </NavLink>
              <NavLink to="/create">
                <img src={AddIcon} alt="Add Icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
