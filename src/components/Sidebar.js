import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
  return (
    <div className="d-flex flex-column bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h3 className="text-primary">
      <span className="text-success fs-2"><strong>Quick </strong></span>
        <span className="text-warning fs-2"><strong> Send</strong> </span>
      </h3>
      <br/>
      <br/>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a href="#" className="nav-link text-success fs-5 active">
            <i className="bi bi-house"></i> Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-success fs-5">
            <i className="bi bi-table"></i> Clients
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-success fs-5">
            <i className="bi bi-bar-chart"></i> Agents
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-success fs-5">
            <i className="bi bi-person"></i> Comptes
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-success fs-5">
            <i className="bi bi-person"></i> Finances
          </a>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
