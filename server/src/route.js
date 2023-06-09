const express = require('express');
const route = express.Router();
const Usuario = require('./controllers/usuarioController');

const usuario = new Usuario();

route.post('/usuario', usuario.usuarioAdd);

module.exports = route;