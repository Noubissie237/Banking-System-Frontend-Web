import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Clients from "./components/Clients";
import Finances from "./components/Finances";
import Agents from "./components/Agents";
import PrivateRoute from "./services/PrivateRoute";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Accounts from "./components/Accounts";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="d-flex">
      {!isLoginPage && <Sidebar />}
      <div className="flex-grow-1">
        {!isLoginPage && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/clients" element={<Clients />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
