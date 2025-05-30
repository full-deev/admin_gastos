const express = require('express');
const router = express.Router();
const pool = require('../models/database');

// Mostrar todos los gastos
router.get('/', (req, res) => {
  pool.query('SELECT * FROM gastos ORDER BY fecha DESC', (err, result) => {
    if (err) console.error(err);
    res.render('gastos', { gastos: result.rows });
  });
});

// Agregar gasto/ingreso
router.post('/', (req, res) => {
  const { descripcion, monto, categoria, fecha, tipo } = req.body;
  pool.query(
    'INSERT INTO gastos (descripcion, monto, categoria, fecha, tipo) VALUES ($1, $2, $3, $4, $5)',
    [descripcion, monto, categoria, fecha, tipo],
    (err) => {
      if (err) console.error(err);
      res.redirect('/gastos');
    }
  );
});

// Eliminar
router.get('/eliminar/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM gastos WHERE id = $1', [id], (err) => {
    if (err) console.error(err);
    res.redirect('/gastos');
  });
});

// Formulario editar
router.get('/editar/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM gastos WHERE id = $1', [id], (err, result) => {
    if (err) console.error(err);
    res.render('editar', { gasto: result.rows[0] });
  });
});

// Guardar cambios de edición
router.post('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion, monto, categoria, fecha, tipo } = req.body;
  pool.query(
    'UPDATE gastos SET descripcion = $1, monto = $2, categoria = $3, fecha = $4, tipo = $5 WHERE id = $6',
    [descripcion, monto, categoria, fecha, tipo, id],
    (err) => {
      if (err) console.error(err);
      res.redirect('/gastos');
    }
  );
});

module.exports = router;