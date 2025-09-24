-- Sukurti duomenų bazę
CREATE DATABASE IF NOT EXISTS grozio_salonas;
USE grozio_salonas;

-- Paslaugų lentelė
CREATE TABLE paslaugos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pavadinimas VARCHAR(255) NOT NULL,
    aprasymas TEXT,
    trukme_min INT NOT NULL,
    kaina DECIMAL(10,2) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

-- Darbuotojų lentelė
CREATE TABLE darbuotojai (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vardas VARCHAR(100) NOT NULL,
    pavarde VARCHAR(100) NOT NULL,
    specializacija VARCHAR(255),
    aprasymas TEXT,
    nuotrauka VARCHAR(255),
    active BOOLEAN DEFAULT TRUE
);

-- Registracijų lentelė
CREATE TABLE registracijos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vardas VARCHAR(100) NOT NULL,
    pavarde VARCHAR(100) NOT NULL,
    telefonas VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    paslauga_id INT,
    darbuotojas_id INT,
    data DATE NOT NULL,
    laikas TIME NOT NULL,
    statusas ENUM('laukia', 'patvirtinta', 'atšaukta') DEFAULT 'laukia',
    sukurtas TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paslauga_id) REFERENCES paslaugos(id),
    FOREIGN KEY (darbuotojas_id) REFERENCES darbuotojai(id)
);

-- Įrašų įterpimas
INSERT INTO paslaugos (pavadinimas, aprasymas, trukme_min, kaina) VALUES
('Kirpimas', 'Profesionalus plaukų kirpimas', 60, 25.00),
('Daugiaspalvis dažymas', 'Plaukų dažymas keliais atspalviais', 180, 80.00),
('Pedžiūra', 'Pėdų priežiūra ir manikiūras', 45, 35.00),
('Makiažas', 'Vakarinis makiažas', 60, 40.00),
('Veido procedūros', 'Veido valymas ir masažas', 90, 60.00);

INSERT INTO darbuotojai (vardas, pavarde, specializacija, aprasymas) VALUES
('Rasa', 'Petraitytė', 'Kirpėja', 'Patyrusi kirpėja su 10 metų patirtimi'),
('Gintarė', 'Kazlauskienė', 'Makiažo specialistė', 'Profesionali makiažo specialistė'),
('Lina', 'Jankauskaitė', 'Kosmetologė', 'Veido procedūrų specialistė'),
('Eglė', 'Balčiūnaitė', 'Maničiūro specialistė', 'Nagų priežiūros profesionalė');