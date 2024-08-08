const express = require('express');
const router = express.Router(); // Crear un enrutador Express
const Users = require('./../controllers/auth.controller');

// Configurar las rutas de autenticación
router.post('/register', Users.createUser);
router.post('/login', Users.loginUser);

module.exports = router; // Exportar el enrutador
