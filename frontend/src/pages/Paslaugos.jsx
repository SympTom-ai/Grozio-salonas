import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Paslaugos.css';

const Paslaugos = () => {
  const [paslaugos, setPaslaugos] = useState([]);

  useEffect(() => {
    loadPaslaugos();
  }, []);

  const loadPaslaugos = async () => {
    try {
      const response = await axios.get('/api/paslaugos');
      setPaslaugos(response.data);
    } catch (error) {
      console.error('Klaida kraunant paslaugas:', error);
    }
  };

  return (
    <div className="paslaugos">
      <div className="container">
        <h1>Mūsų Paslaugos</h1>
        <div className="paslaugos-grid">
          {paslaugos.map(paslauga => (
            <div key={paslauga.id} className="paslauga-card">
              <h3>{paslauga.pavadinimas}</h3>
              <p className="kaina">{paslauga.kaina}€</p>
              <p className="trukme">Trukmė: {paslauga.trukme_min} min.</p>
              <p className="aprasymas">{paslauga.aprasymas}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paslaugos;