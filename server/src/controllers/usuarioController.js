const Validacao = require('../middleware/validacao');
const env = require('dotenv');
const knex = require('../database/config');
const jwt = require('jwt-simple');
const brcrypt = require('bcryptjs');

class usuarioController {
    async usuarioAdd(req, res) {
        try {
            let usuario = {
                'email': req.body.email.trim(),
                'senha': req.body.senha.trim(),
                'nome': req.body.nome.toUpperCase().trim(),
            }
            const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
            if (!emailRegex.test(usuario.email)) throw new Validacao('Esse email não é valido');
            if (!usuario.nome) throw new Validacao('Nome é obrigatorio');
            if (!usuario.email) throw new Validacao('Email é obrigatorio');
            if (!usuario.senha) throw new Validacao('Senha é obrigatorio');
            let token = jwt.encode(usuario.email, process.env.SEGREDO);
            let salto = brcrypt.genSaltSync(10);
            usuario.senha = brcrypt.hashSync(usuario.senha, salto);
            let dados = {
                ...usuario,
                'token': token
            };
            await knex('usuario').count('email as email').where({ email: dados.email }).then((resposta) => {
                if (resposta[0].email > 0) {
                    throw new Validacao('Esse email já esta cadastrado');
                }
            });
            await knex('usuario').insert(dados).returning('id')
           
            res.status(201).json({ dados: usuario });
        } catch (error) {
            res.status(400).json({ error: error })
        }
    }
}

module.exports = usuarioController;