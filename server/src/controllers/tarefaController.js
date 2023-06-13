const Validacao = require('../middleware/validacao');
const knex = require('../database/config');
const moment = require('moment');

class TarefaController {
    async tarefaAll(req, res) {
        try {
            var id_usuario = req.id_usuario;
            if (!id_usuario) throw new Validacao('Usuario é obrigatorio');
            const tarefa = await knex('tarefa').where({ id_usuario: id_usuario }).select('*');
            res.status(200).json(tarefa)
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
    async tarefaAdd(req, res) {
        try {
            var date = moment().format();
            let tarefa = {
                'descricao': req.body.descricao.trim(),
                'data': date,
                'id_aplicativo': req.body.id_aplicativo,
                "id_usuario": req.id_usuario
            }
            if (!req.body.descricao) throw new Validacao('Descrição é obrigatorio');
            await knex('tarefa').insert(tarefa);
            res.status(201).json(tarefa)
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
    async tarefaExcluir(req, res) {
        try {
            var id_usuario = req.id_usuario;
            var id = req.params.id;

            if (!id) throw new Validacao('Id é obrigatorio');
            await knex('tarefa').where({ id: id, id_usuario: id_usuario }).del();
            res.status(201).json({ ok: 'sucesso' })
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
}

module.exports = TarefaController;