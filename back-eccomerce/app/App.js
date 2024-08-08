'use strict';

const express = require('express');
const cors = require('cors');
const app = express(); // Cambié 'App' a 'app' para seguir las convenciones comunes

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importa las rutas
const productRoutes = require('./routes/productRoutes'); // Ruta para productos
const authRoutes = require('./routes/auth.routes'); // Ruta para autenticación

// Configura las rutas
app.use('/api/products', productRoutes); // Ruta para productos
app.use('/api/auth', authRoutes); // Ruta para autenticación

module.exports = app;
