const User = require('../middlewares/auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.SECRET_KEY || '123456789'; // Asegúrate de que SECRET_KEY esté definida

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Name, email, and password are required' });
    }

    try {
        // Crear un nuevo usuario con la contraseña hasheada
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = { name, email, password: hashedPassword };

        // Crear el usuario en la base de datos
        const user = await User.create(newUser);

        // Generar token de acceso
        const expiresIn = 24 * 60 * 60; // 24 horas
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn });

        // Responder con el usuario y el token
        res.status(201).send({ message: 'User created successfully', user: { name: user.name, email: user.email }, accessToken });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).send({ message: 'Email already exists' });
        }
        console.error('Error creating user:', err); // Para registrar errores en el servidor
        res.status(500).send({ message: 'Server error', error: err.message });
    }
};

// Controlador para iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    try {
        // Buscar al usuario por correo electrónico
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).send({ message: 'Email not found' });
        }

        // Comparar la contraseña proporcionada con el hash almacenado
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generar token de acceso
        const expiresIn = 24 * 60 * 60; // 24 horas
        const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn });

        // Responder con el usuario y el token
        res.send({ message: 'Login successful', user: { name: user.name, email: user.email }, accessToken });
    } catch (err) {
        console.error('Error logging in:', err); // Para registrar errores en el servidor
        res.status(500).send({ message: 'Server error', error: err.message });
    }
};
