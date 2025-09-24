import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Sveiki atvykę į Grožio Saloną</h1>
          <p>Profesionalios grožio paslaugos jūsų patogumui</p>
          <Link to="/registracija" className="btn-primary">Registruotis</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Kodėl pasirinkti mus?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🏆 Profesionalus personalas</h3>
              <p>Patyrę specialistai su aukštu kvalifikacijos lygiu</p>
            </div>
            <div className="feature">
              <h3>💫 Kokybiškos paslaugos</h3>
              <p>Naudojame tik aukščiausios kokybės produktus</p>
            </div>
            <div className="feature">
              <h3>⏰ Patogus laikas</h3>
              <p>Dirbame kada jums patogiausia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;