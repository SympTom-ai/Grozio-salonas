import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Darbuotojai.css';

const Darbuotojai = () => {
  const [darbuotojai, setDarbuotojai] = useState([]);

  useEffect(() => {
    loadDarbuotojai();
  }, []);

  const loadDarbuotojai = async () => {
    try {
      const response = await axios.get('/api/darbuotojai');
      setDarbuotojai(response.data);
    } catch (error) {
      console.error('Klaida kraunant darbuotojus:', error);
    }
  };

  return (
    <div className="darbuotojai">
      <div className="container">
        <h1>Mūsų Komanda</h1>
        <div className="darbuotojai-grid">
          {darbuotojai.map(darbuotojas => (
            <div key={darbuotojas.id} className="darbuotojas-card">
              <div className="darbuotojas-info">
                <h3>{darbuotojas.vardas} {darbuotojas.pavarde}</h3>
                <p className="specializacija">{darbuotojas.specializacija}</p>
                <p className="aprasymas">{darbuotojas.aprasymas}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Darbuotojai;