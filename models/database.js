const { Pool } = require('pg');

// Conexión a la base de datos usando variable de entorno (Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Crear tabla si no existe
pool.query(`CREATE TABLE IF NOT EXISTS gastos (
  id SERIAL PRIMARY KEY,
  descripcion TEXT,
  monto REAL,
  categoria TEXT,
  fecha TEXT,
  tipo TEXT
)`, (err) => {
  if (err) console.error('Error creando tabla', err);
  else console.log('Tabla gastos lista');
});

module.exports = pool;
