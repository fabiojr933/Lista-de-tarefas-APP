const express = require('express');
const route = express.Router();
const Usuario = require('./controllers/usuarioController');
const Aplicativo = require('./controllers/aplicativoController');
const Tarefa = require('./controllers/tarefaController');
const Middleware = require('./middleware/autenticacao');

const usuario = new Usuario();
const aplicativo = new Aplicativo();
const tarefa = new Tarefa();

route.post('/usuario', usuario.usuarioAdd);
route.post('/usuario/login', usuario.login);

route.post('/aplicativo', Middleware.Autorizacao, aplicativo.aplicativoAdd);
route.get('/aplicativoPendente', Middleware.Autorizacao, aplicativo.aplicativoAllPendente);
route.get('/aplicativoFinalizado', Middleware.Autorizacao, aplicativo.aplicativoAllFinalizado);
route.get('/aplicativo/:id', Middleware.Autorizacao, aplicativo.aplicativoAllId);
route.put('/aplicativo/:id', Middleware.Autorizacao, aplicativo.aplicativoFinalizado);
route.delete('/aplicativo/:id', Middleware.Autorizacao, aplicativo.aplicativoExcluir);

route.get('/tarefa', Middleware.Autorizacao, tarefa.tarefaAll);
route.post('/tarefa', Middleware.Autorizacao, tarefa.tarefaAdd);
route.delete('/tarefa/:id', Middleware.Autorizacao, tarefa.tarefaExcluir);

module.exports = route;