const Validacao = require('../middleware/validacao');
const knex = require('../database/config');
const moment = require('moment');

class tarefaController {
    async aplicativoAdd(req, res) {
        try {
            let tarefa = {
                'descricao': req.body.descricao.trim(),
                'foto': req.body.foto,
                'github': req.body.github,
                'finalizado': 'N',
                'data': moment.now('L'),
                'observacao': req.body.observacao,
            }
            console.log(tarefa)
            if (!req.body.descricao) throw new Validacao('Descrição é obrigatorio');
            await knex('tarefa').insert(tarefa);
            res.status(201).json(tarefa)
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error })
        }
    }
}
module.exports = tarefaController;