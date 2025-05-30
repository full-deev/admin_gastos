const express = require('express');
const app = express();
const path = require('path');
const gastosRoutes = require('./routes/gastos');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/gastos', gastosRoutes);

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
