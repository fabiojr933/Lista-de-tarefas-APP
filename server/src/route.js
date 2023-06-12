const express = require('express');
const route = express.Router();
const Usuario = require('./controllers/usuarioController');
const Tarefa = require('./controllers/tarefaController');
const Middleware = require('./middleware/autenticacao');

const usuario = new Usuario();
const tarefa = new Tarefa();

route.post('/usuario', usuario.usuarioAdd);
route.post('/usuario/login', usuario.login);

route.post('/tarefa', Middleware.Autorizacao, tarefa.aplicativoAdd);
route.get('/tarefa', Middleware.Autorizacao, tarefa.aplicativoAll);
route.get('/tarefa/:id', Middleware.Autorizacao, tarefa.aplicativoAllId);
route.put('/tarefa/:id', Middleware.Autorizacao, tarefa.aplicativoFinalizado);

module.exports = route;