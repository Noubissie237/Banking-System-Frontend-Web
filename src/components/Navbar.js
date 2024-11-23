import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="ms-auto">
        <a className="navbar-brand" href="#">Admin</a>
        <button className="btn btn-outline-danger">Déconnexion</button>
      </div>
    </nav>
  );
}

export default Navbar;
