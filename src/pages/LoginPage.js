import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'


const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/SERVICE-AUTHENTIFICATION/auth/login-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login ou mot de passe incorrect');
      }
  
      const data = await response.json(); 
      const token = data.token;
      
      localStorage.setItem('token', token);
      navigate('/'); 
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };
  
  

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg">
        <h1 className="text-center mb-4">Connexion Admin</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label htmlFor="login">Login</label>
            <input
              type="text"
              id="login"
              className="form-control"
              placeholder="Entrez votre login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
