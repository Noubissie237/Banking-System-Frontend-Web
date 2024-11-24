import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Clients from "./components/Clients";
import Finances from "./components/Finances";
import Agents from "./components/Agents";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Accounts from "./components/Accounts";

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;