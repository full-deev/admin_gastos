const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Mostrar lista de gastos
router.get('/', (req, res) => {
  db.all('SELECT * FROM gastos', (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      res.render('gastos', { gastos: rows });
    }
  });
});

// Agregar gasto o ingreso
router.post('/', (req, res) => {
  const { descripcion, monto, categoria, fecha, tipo } = req.body;
  db.run(`INSERT INTO gastos (descripcion, monto, categoria, fecha, tipo) VALUES (?, ?, ?, ?, ?)`,
    [descripcion, monto, categoria, fecha, tipo],
    function (err) {
      if (err) {
        console.error(err);
      }
      res.redirect('/gastos');
    });
});

// Eliminar
router.get('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM gastos WHERE id = ?`, id, function (err) {
    if (err) {
      console.error(err);
    }
    res.redirect('/gastos');
  });
});

// Formulario editar
router.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM gastos WHERE id = ?', id, (err, gasto) => {
    if (err) {
      console.error(err);
    } else {
      res.render('editar', { gasto });
    }
  });
});

// Actualizar gasto
router.post('/editar/:id', (req, res) => {
  const id = req.params.id;
  const { descripcion, monto, categoria, fecha, tipo } = req.body;

  db.run(`UPDATE gastos SET descripcion = ?, monto = ?, categoria = ?, fecha = ?, tipo = ? WHERE id = ?`,
    [descripcion, monto, categoria, fecha, tipo, id],
    function (err) {
      if (err) {
        console.error(err);
      }
      res.redirect('/gastos');
    });
});

module.exports = router;
