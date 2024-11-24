import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="ms-auto">
        <a className="navbar-brand" href="#">Admin</a>
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
