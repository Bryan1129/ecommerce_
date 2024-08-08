'use strict';

const Product = require('../models/productModel'); // Asegúrate de que la ruta sea correcta

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    // Verifica que el cuerpo de la solicitud contenga todos los campos requeridos
    const { id, title, price } = req.body;

    if (id === undefined || title === undefined || price === undefined) {
        return res.status(400).json({ error: 'Faltan campos requeridos: id, title y price son necesarios.' });
    }

    try {
        // Crea un nuevo producto con los datos del cuerpo de la solicitud
        const newProduct = new Product(req.body);
        
        // Guarda el producto en la base de datos
        await newProduct.save();
        
        // Responde con el producto creado y un estado 201
        res.status(201).json(newProduct);
    } catch (err) {
        // Manejo de errores en caso de fallos en la creación
        res.status(500).json({ error: err.message });
    }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
      // Busca el producto por ID personalizado
      const product = await Product.findOne({ id: req.params.id });
      
      // Verifica si el producto fue encontrado
      if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
      }
      
      // Responde con el producto encontrado
      res.status(200).json(product);
  } catch (err) {
      // Manejo de errores en caso de fallos en la búsqueda
      res.status(500).json({ error: err.message });
  }
};

// Actualizar un producto por ID
// Controlador para actualizar un producto
exports.updateProductById = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedProduct = await Product.findOneAndUpdate(
          { id },
          req.body,
          { new: true, runValidators: true }
      );

      if (!updatedProduct) {
          return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.status(200).json(updatedProduct);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


// Eliminar un producto por ID
exports.deleteProductById = async (req, res) => {
  try {
      const productId = req.params.id; // Asumiendo que el id es un campo personalizado

      // Intenta eliminar el producto por ID
      const result = await Product.findOneAndDelete({ id: productId });

      // Verifica si el producto fue encontrado y eliminado
      if (!result) {
          return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

