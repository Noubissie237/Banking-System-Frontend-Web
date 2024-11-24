import React from "react";
import { useNavigate } from "react-router-dom";
import getAdminId from '../services/Security';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const token = localStorage.getItem('token');
  const admin = getAdminId(token);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="ms-auto">
        <a className="navbar-brand" href="#">{admin[1]}</a>
        <button 
          className="btn btn-outline-danger" 
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
