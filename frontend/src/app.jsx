import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Paslaugos from './pages/Paslaugos';
import Darbuotojai from './pages/Darbuotojai';
import Registracija from './pages/Registracija';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paslaugos" element={<Paslaugos />} />
            <Route path="/darbuotojai" element={<Darbuotojai />} />
            <Route path="/registracija" element={<Registracija />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;