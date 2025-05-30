const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./gastos.db');

// Creamos tabla si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT,
    monto REAL,
    categoria TEXT,
    fecha TEXT,
    tipo TEXT
  )`);
});

module.exports = db;
