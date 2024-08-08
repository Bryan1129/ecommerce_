'use strict';

const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB_URI, {
    // Eliminamos useNewUrlParser y useUnifiedTopology
});

const db = {};

db.mongoose = mongoose;
db.products = require('../models/productModel'); // Ajusta la ruta según sea necesario

module.exports = db;
