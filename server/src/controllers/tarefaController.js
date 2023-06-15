const Validacao = require('../middleware/validacao');
const knex = require('../database/config');
const moment = require('moment');

class TarefaController {
    async tarefaAll(req, res) {
        try {
            var id_usuario = req.id_usuario;
            var id_aplicativo = req.params.id_aplicativo;
            if (!id_usuario) throw new Validacao('Usuario é obrigatorio');        
            if (!id_aplicativo) throw new Validacao('id_Aplicativo é obrigatorio');

            var dadosFinal = [];

            const tarefa_backlog = await knex('tarefa').where({ id_usuario: id_usuario, 'backlog': 'S', id_aplicativo: id_aplicativo }).select('*');
            dadosFinal.push({ title: 'Backlog', creatable: true, 'cards': [] })
            tarefa_backlog.map((v) => {
                dadosFinal[0].cards.push({ 'id': v.id, 'content': v.descricao, 'labels': ['#3b5bfd'], 'user': 'https://avatars.githubusercontent.com/u/41793614?s=400&u=f2e2f004aa7f6315c2d69ca8256aaea280bb41b2&v=4' });
            });

            const tarefa_andamento = await knex('tarefa').where({ id_usuario: id_usuario, 'andamento': 'S', id_aplicativo: id_aplicativo }).select('*');
            dadosFinal.push({ title: 'Em andamento', creatable: false, 'cards': [] })
            tarefa_andamento.map((v) => {
                dadosFinal[1].cards.push({ 'id': v.id, 'content': v.descricao, 'labels': ['#3b5d'], 'user': 'https://avatars.githubusercontent.com/u/41793614?s=400&u=f2e2f004aa7f6315c2d69ca8256aaea280bb41b2&v=4' });
            });

            const tarefa_revisao_aprovacao = await knex('tarefa').where({ id_usuario: id_usuario, 'revisao_aprovacao': 'S', id_aplicativo: id_aplicativo }).select('*');
            dadosFinal.push({ title: 'Revisão/Aprovação', creatable: false, 'cards': [] })
            tarefa_revisao_aprovacao.map((v) => {
                dadosFinal[2].cards.push({ 'id': v.id, 'content': v.descricao, 'labels': ['#9ceb34'], 'user': 'https://avatars.githubusercontent.com/u/41793614?s=400&u=f2e2f004aa7f6315c2d69ca8256aaea280bb41b2&v=4' });
            });

            const tarefa_deploy = await knex('tarefa').where({ id_usuario: id_usuario, 'deploy': 'S', id_aplicativo: id_aplicativo }).select('*');
            dadosFinal.push({ title: 'Deploy', creatable: false, 'cards': [] })
            tarefa_deploy.map((v) => {
                dadosFinal[3].cards.push({ 'id': v.id, 'content': v.descricao, 'labels': ['#fc0505'], 'user': 'https://avatars.githubusercontent.com/u/41793614?s=400&u=f2e2f004aa7f6315c2d69ca8256aaea280bb41b2&v=4' });
            });

            const tarefa_arquivado = await knex('tarefa').where({ id_usuario: id_usuario, 'arquivado': 'S', id_aplicativo: id_aplicativo }).select('*');
            dadosFinal.push({ title: 'Arquivado', creatable: false, done: true, 'cards': [] })
            tarefa_arquivado.map((v) => {
                dadosFinal[4].cards.push({ 'id': v.id, 'content': v.descricao, 'labels': ['#eb7734'], 'user': 'https://avatars.githubusercontent.com/u/41793614?s=400&u=f2e2f004aa7f6315c2d69ca8256aaea280bb41b2&v=4' });
            });

            res.status(200).json(dadosFinal)

        } catch (error) {
            console.log(error)
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
                "id_usuario": req.id_usuario,
                'backlog': 'S'
            }
            if (!req.body.descricao) throw new Validacao('Descrição é obrigatorio');
            if (!req.body.id_aplicativo) throw new Validacao('id aplicativo é obrigatorio');
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
    async tarefaUpdate(req, res) {
        var id_usuario = req.id_usuario;
        var id = req.params.id;
        var dados = {
            'backlog': req.body.backlog,
            'andamento': req.body.andamento,
            'revisao_aprovacao': req.body.revisao_aprovacao,
            'deploy': req.body.deploy,
            'arquivado': req.body.arquivado,
        }
        try {
            await knex('tarefa').update(dados).where({ id: id, id_usuario: id_usuario });
            res.status(200).json({ ok: 'sucesso' })
        } catch (error) {
            res.status(400).json({ error: 'Ops! ocorreu algum erro' });
        }
    }
}

module.exports = TarefaController;