'use strict';

const express = require('express');
const router = express.Router();

// Controladores para manejar las rutas
const productController = require('../controllers/productController'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para agregar un nuevo producto
router.post('/NewProduct', productController.createProduct);

// Ruta para obtener un producto por ID
router.get('/:id', productController.getProductById);

// Ruta para actualizar un producto por ID
router.put('/:id', productController.updateProductById);

// Ruta para eliminar un producto por ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;
