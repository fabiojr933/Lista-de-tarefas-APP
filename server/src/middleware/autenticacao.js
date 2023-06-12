const env = require('dotenv');
const knex = require('../database/config');
env.config();

exports.Autorizacao = async (req, res, next) => {   
    const autorizacao = req.header('Authorization')?.replace('Bearer ', ''); 
    if (!autorizacao || autorizacao == '' || autorizacao == undefined) {
        return res.status(401).json({
            status: '401',
            resultado: 'falha',
            error: 'Token é obrigatorio!'
        });
    }
    try {
        await knex('usuario').where({ token: autorizacao }).select('*').then((resposta) => {    
            if (resposta[0].id) {       
                req.id_usuario = resposta[0].id;         
                next();
            }else{
                return res.status(401).json({
                    status: '401',
                    resultado: 'falha',
                    erro: 'token invalido!'
                });
            }
        });
    } catch (error) {
        return res.status(401).json({
            status: '401',
            resultado: 'falha',
            erro: 'token invalido!'
        });;
    }
}