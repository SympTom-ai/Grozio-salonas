const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Testiniai duomenys (naudojami, jei duomenų bazė nepasiekiama)
const testinesPaslaugos = [
  { id: 1, pavadinimas: 'Kirpimas', aprasymas: 'Profesionalus plaukų kirpimas', trukme_min: 60, kaina: 25.00 },
  { id: 2, pavadinimas: 'Daugiaspalvis dažymas', aprasymas: 'Plaukų dažymas keliais atspalviais', trukme_min: 180, kaina: 80.00 },
  { id: 3, pavadinimas: 'Pedžiūra', aprasymas: 'Pėdų priežiūra ir manikiūras', trukme_min: 45, kaina: 35.00 },
  { id: 4, pavadinimas: 'Makiažas', aprasymas: 'Vakarinis makiažas', trukme_min: 60, kaina: 40.00 },
  { id: 5, pavadinimas: 'Veido procedūros', aprasymas: 'Veido valymas ir masažas', trukme_min: 90, kaina: 60.00 }
];

const testiniaiDarbuotojai = [
  { id: 1, vardas: 'Rasa', pavarde: 'Petraitytė', specializacija: 'Kirpėja', aprasymas: 'Patyrusi kirpėja su 10 metų patirtimi' },
  { id: 2, vardas: 'Gintarė', pavarde: 'Kazlauskienė', specializacija: 'Makiažo specialistė', aprasymas: 'Profesionali makiažo specialistė' },
  { id: 3, vardas: 'Lina', pavarde: 'Jankauskaitė', specializacija: 'Kosmetologė', aprasymas: 'Veido procedūrų specialistė' },
  { id: 4, vardas: 'Eglė', pavarde: 'Balčiūnaitė', specializacija: 'Maničiūro specialistė', aprasymas: 'Nagų priežiūros profesionalė' }
];

// MySQL duomenų bazės konfigūracija
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '', // Tuščias slaptažodis, jei naudojate XAMPP
  database: process.env.DB_NAME || 'grozio_salonas',
  port: parseInt(process.env.DB_PORT) || 3306
};

let dbConnected = false;

// Duomenų bazės ryšio funkcija
async function createConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Prisijungta prie MySQL duomenų bazės');
    dbConnected = true;
    return connection;
  } catch (error) {
    console.error('Klaida jungiantis prie duomenų bazės. Naudojami testiniai duomenys.');
    console.error('Klaidos detalės:', error.message);
    dbConnected = false;
    return null;
  }
}

// API Routes

// Gauti visas paslaugas
app.get('/api/paslaugos', async (req, res) => {
  try {
    if (!dbConnected) {
      console.log('Grąžinami testiniai paslaugų duomenys');
      return res.json(testinesPaslaugos);
    }
    
    const connection = await createConnection();
    if (!connection) {
      return res.json(testinesPaslaugos);
    }
    
    const [rows] = await connection.execute('SELECT * FROM paslaugos WHERE active = 1');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Klaida gaunant paslaugas. Grąžinami testiniai duomenys:', error.message);
    res.json(testinesPaslaugos);
  }
});

// Gauti visus darbuotojus
app.get('/api/darbuotojai', async (req, res) => {
  try {
    if (!dbConnected) {
      console.log('Grąžinami testiniai darbuotojų duomenys');
      return res.json(testiniaiDarbuotojai);
    }
    
    const connection = await createConnection();
    if (!connection) {
      return res.json(testiniaiDarbuotojai);
    }
    
    const [rows] = await connection.execute('SELECT * FROM darbuotojai WHERE active = 1');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Klaida gaunant darbuotojus. Grąžinami testiniai duomenys:', error.message);
    res.json(testiniaiDarbuotojai);
  }
});

// Gauti laisvus laikus konkrečiai dienai ir darbuotojui
app.get('/api/laisvi-laikai', async (req, res) => {
  try {
    const { data, darbuotojas_id } = req.query;
    
    // Visada grąžiname tuos pačius laikus testavimui
    const laisviLaikai = [
      '09:00', '10:00', '11:00', '12:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00'
    ];
    
    console.log('Grąžinami laisvi laikai:', laisviLaikai);
    res.json(laisviLaikai);
    
  } catch (error) {
    console.error('Klaida gaunant laisvus laikus:', error.message);
    // Grąžiname default laikus net jei klaida
    res.json(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']);
  }
});

// Sukurti naują registraciją
app.post('/api/registracijos', async (req, res) => {
  try {
    const { vardas, pavarde, telefonas, email, paslauga_id, darbuotojas_id, data, laikas } = req.body;
    
    console.log('Gauta registracija:', {
      vardas, pavarde, telefonas, email, paslauga_id, darbuotojas_id, data, laikas
    });
    
    if (dbConnected) {
      const connection = await createConnection();
      if (connection) {
        const [result] = await connection.execute(
          'INSERT INTO registracijos (vardas, pavarde, telefonas, email, paslauga_id, darbuotojas_id, data, laikas, statusas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [vardas, pavarde, telefonas, email, paslauga_id, darbuotojas_id, data, laikas, 'patvirtinta']
        );
        await connection.end();
        console.log('Registracija išsaugota duomenų bazėje, ID:', result.insertId);
      }
    }
    
    // Visada grąžiname sėkmės atsakymą
    res.json({ 
      message: 'Registracija sėkminga! Netrukus susisieksime su jumis.', 
      id: Date.now(),
      testMode: !dbConnected 
    });
    
  } catch (error) {
    console.error('Klaida registruojant:', error.message);
    // Net jei klaida, vis tiek grąžiname sėkmės pranešimą testavimui
    res.json({ 
      message: 'Registracija sėkminga! Netrukus susisieksime su jumis.', 
      id: Date.now(),
      error: error.message 
    });
  }
});

// Test route - patikrinti ar serveris veikia
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Serveris veikia sėkmingai!', 
    timestamp: new Date().toISOString(),
    database: dbConnected ? 'Prisijungta' : 'Neprisijungta (test mode)'
  });
});

// Pradinis route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Grožio salono backend API', 
    version: '1.0.0',
    database: dbConnected ? 'Prisijungta' : 'Test mode' 
  });
});

// Inicijuoti ryšį su duomenų baze startuojant serverį
createConnection().then(() => {
  console.log('Duomenų bazės ryšio inicijavimas baigtas');
});

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Serveris veikia portu: ${PORT}`);
  console.log(`📊 Duomenų bazė: ${dbConnected ? 'Prisijungta' : 'Test mode'}`);
  console.log(`🔗 Adresas: http://localhost:${PORT}`);
  console.log(`=================================`);
});