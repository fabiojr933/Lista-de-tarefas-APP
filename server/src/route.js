const express = require('express');
const route = express.Router();
const Usuario = require('./controllers/usuarioController');
const Tarefa = require('./controllers/tarefaController');

const usuario = new Usuario();
const tarefa = new Tarefa();

route.post('/usuario', usuario.usuarioAdd);
route.post('/usuario/login', usuario.login);

route.post('/tarefa', tarefa.aplicativoAdd);
module.exports = route;