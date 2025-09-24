import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registracija.css';

const Registracija = () => {
  const [formData, setFormData] = useState({
    vardas: '',
    pavarde: '',
    telefonas: '',
    email: '',
    paslauga_id: '',
    darbuotojas_id: '',
    data: '',
    laikas: ''
  });
  
  const [paslaugos, setPaslaugos] = useState([]);
  const [darbuotojai, setDarbuotojai] = useState([]);
  const [laisviLaikai, setLaisviLaikai] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPaslaugos();
    loadDarbuotojai();
  }, []);

  useEffect(() => {
    if (formData.data && formData.darbuotojas_id) {
      loadLaisviLaikai();
    }
  }, [formData.data, formData.darbuotojas_id]);

  const loadPaslaugos = async () => {
    try {
      const response = await axios.get('/api/paslaugos');
      setPaslaugos(response.data);
    } catch (error) {
      console.error('Klaida kraunant paslaugas:', error);
    }
  };

  const loadDarbuotojai = async () => {
    try {
      const response = await axios.get('/api/darbuotojai');
      setDarbuotojai(response.data);
    } catch (error) {
      console.error('Klaida kraunant darbuotojus:', error);
    }
  };

  const loadLaisviLaikai = async () => {
    try {
      const response = await axios.get('/api/laisvi-laikai', {
        params: {
          data: formData.data,
          darbuotojas_id: formData.darbuotojas_id
        }
      });
      setLaisviLaikai(response.data);
      setFormData(prev => ({ ...prev, laikas: '' }));
    } catch (error) {
      console.error('Klaida kraunant laisvus laikus:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/registracijos', formData);
      setMessage('Registracija sėkminga! Netrukus susisieksime su jumis.');
      setFormData({
        vardas: '',
        pavarde: '',
        telefonas: '',
        email: '',
        paslauga_id: '',
        darbuotojas_id: '',
        data: '',
        laikas: ''
      });
    } catch (error) {
      setMessage('Klaida registruojant. Bandykite dar kartą.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="registracija">
      <div className="container">
        <h1>Registracija į paslaugą</h1>
        
        {message && <div className="message">{message}</div>}
        
        <form onSubmit={handleSubmit} className="registracija-form">
          <div className="form-row">
            <div className="form-group">
              <label>Vardas *</label>
              <input
                type="text"
                name="vardas"
                value={formData.vardas}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Pavardė *</label>
              <input
                type="text"
                name="pavarde"
                value={formData.pavarde}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Telefonas *</label>
              <input
                type="tel"
                name="telefonas"
                value={formData.telefonas}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>El. paštas</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Paslauga *</label>
              <select
                name="paslauga_id"
                value={formData.paslauga_id}
                onChange={handleChange}
                required
              >
                <option value="">Pasirinkite paslaugą</option>
                {paslaugos.map(paslauga => (
                  <option key={paslauga.id} value={paslauga.id}>
                    {paslauga.pavadinimas} - {paslauga.kaina}€
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Specialistas *</label>
              <select
                name="darbuotojas_id"
                value={formData.darbuotojas_id}
                onChange={handleChange}
                required
              >
                <option value="">Pasirinkite specialistą</option>
                {darbuotojai.map(darbuotojas => (
                  <option key={darbuotojas.id} value={darbuotojas.id}>
                    {darbuotojas.vardas} {darbuotojas.pavarde}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Data *</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Laikas *</label>
              <select
                name="laikas"
                value={formData.laikas}
                onChange={handleChange}
                required
                disabled={!laisviLaikai.length}
              >
                <option value="">Pasirinkite laiką</option>
                {laisviLaikai.map(laikas => (
                  <option key={laikas} value={laikas}>
                    {laikas}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button type="submit" className="btn-primary">Registruotis</button>
        </form>
      </div>
    </div>
  );
};

export default Registracija;