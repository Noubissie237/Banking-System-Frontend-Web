import React from "react";
import { NavLink, useLocation } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  const location = useLocation(); 

  return (
    <div className="d-flex flex-column bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h3 className="text-primary">
        <span className="text-success fs-2"><strong>Quick </strong></span>
        <span className="text-warning fs-2"><strong> Send</strong></span>
      </h3>
      <br />
      <br />
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={`nav-link fs-5 ${location.pathname === "/" ? "active text-success" : "text-dark"}`}
          >
            <i className="bi bi-house"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/clients" 
            className={`nav-link fs-5 ${location.pathname === "/clients" ? "active text-success" : "text-dark"}`}
          >
            <i className="bi bi-table"></i> Clients
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/agents" 
            className={`nav-link fs-5 ${location.pathname === "/agents" ? "active text-success" : "text-dark"}`}
          >
            <i className="bi bi-bar-chart"></i> Agents
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/accounts" 
            className={`nav-link fs-5 ${location.pathname === "/comptes" ? "active text-success" : "text-dark"}`}
          >
            <i className="bi bi-person"></i> Comptes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/finances" 
            className={`nav-link fs-5 ${location.pathname === "/finances" ? "active text-success" : "text-dark"}`}
          >
            <i className="bi bi-wallet2"></i> Finances
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
