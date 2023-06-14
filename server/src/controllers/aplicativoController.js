const Validacao = require('../middleware/validacao');
const knex = require('../database/config');
const moment = require('moment');

class aplicativoController {
    async aplicativoAdd(req, res) {
        try {
            var date = moment().format();
            let tarefa = {
                'descricao': req.body.descricao.trim(),
                'foto': req.body.foto,
                'github': req.body.github,
                'finalizado': 'N',
                'data': date,
                'observacao': req.body.observacao,
                "id_usuario": req.id_usuario
            }
            if (!req.body.descricao) throw new Validacao('Descrição é obrigatorio');
            await knex('aplicativo').insert(tarefa);
            res.status(201).json(tarefa)
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }

    async aplicativoAllPendente(req, res) {
        try {
            var id_usuario = req.id_usuario;
            let data = await knex('aplicativo').where({ finalizado: 'N', id_usuario: id_usuario }).select('*');          
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
    async aplicativoAllFinalizado(req, res) {
        try {
            var id_usuario = req.id_usuario;
            let data = await knex('aplicativo').where({ finalizado: 'S', id_usuario: id_usuario }).select('*');         
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
    async aplicativoAllId(req, res) {
        try {
            var id_usuario = Number(req.id_usuario);
            var id = Number(req.params.id);
            let data = await knex('aplicativo').where({ id: id, id_usuario: id_usuario }).select('*');
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
    async aplicativoFinalizado(req, res) {
        try {
            var id_usuario = Number(req.id_usuario);
            var id = Number(req.params.id);
            var date = moment().format();
            var dados = {
                'observacao': req.body.observacao,
                'data_finalizado': date,
                'github': req.body.github,
                'finalizado': 'S'
            }
            await knex('aplicativo').update(dados).where({ id: id, id_usuario: id_usuario });
            let data_final = await knex('aplicativo').where({ id: id, id_usuario: id_usuario }).select('*');
            res.status(200).json(data_final);
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    } 
    async aplicativoExcluir(req, res) {
        try {
            var id_usuario = req.id_usuario;
            var id = req.params.id;

            if (!id) throw new Validacao('Id é obrigatorio');
            await knex('aplicativo').where({ id: id, id_usuario: id_usuario }).del();
            res.status(200).json({ ok: 'sucesso' })
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    } 
}
module.exports = aplicativoController;