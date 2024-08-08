'use strict';

const db = require('./app/config/db'); // Asegúrate de que la ruta sea la correcta
const CONFIG = require('./app/config/config');
const App = require('./app/app');

// Conectar a MongoDB y luego iniciar el servidor
db.mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');

    App.listen(CONFIG.PORT, (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(`Server running on port: ${CONFIG.PORT}`);
    });
});

// Manejar errores de conexión a MongoDB
db.mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
