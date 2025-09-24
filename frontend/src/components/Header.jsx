import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Grožio Salonas</Link>
        </div>
        <nav className="nav">
          <Link to="/">Pagrindinis</Link>
          <Link to="/paslaugos">Paslaugos</Link>
          <Link to="/darbuotojai">Darbuotojai</Link>
          <Link to="/registracija">Registracija</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;