const ConnectionFactory = require('../infra/ConnectionFactory');
const UsuariosDao = require('../infra/UsuariosDao');

class UsuariosController {

    constructor() {

    }

    usuarioLogado() {
        return (req, res) => {

            let usuario = req.usuario.usuario;

            let connection = new ConnectionFactory();
            let usuariosDao = new UsuariosDao(connection.on());

            usuariosDao.logado(usuario)
            .then(usuarioLogado => {

                console.log(usuarioLogado);
                res.json(usuarioLogado);
            })
            .catch(erro => {

                console.log('falha ao pegar usuario logado');
                console.log(erro);

                res.status(500).json({
                    status: "error",
                    msg: 'Falha ao tentar retornar usuário logado',
                    msgTecnica: {
                        code: erro.code,
                        message: erro.sqlMessage
                    }
                });
            });

            connection.off();
        }
    }

    listar() {
        return (req, res) => {

            let usuario = {
                id: req.query.id,
                usuario: req.query.usuario,
                nome: req.query.nome,
                email: req.query.email,
                cpf: req.query.cpf,
                sexo: req.query.sexo,
                nascimento: req.query.nascimento,
                telefone: req.query.telefone,
                tipo: req.query.tipo
            };

            let connection = new ConnectionFactory();
            let usuariosDao = new UsuariosDao(connection.on());

            usuariosDao.listar(usuario)
            .then(usuarios => {
                console.log('usuarios listados');
                console.log(usuarios);

                res.json(usuarios);
            })
            .catch(erro => {

                console.log('falha ao listar usuarios');
                console.log(erro);

                res.status(500).json({
                    status: 'error',
                    msg: 'Falha ao tentar listar o(s) usuario(s)',
                    msgTecnica: {
                        code: erro.code,
                        message: erro.sqlMessage
                    }
                });
            });

            connection.off();
        }
    }

    cadastrar() {

        return (req, res) => {
            
            let usuario = req.body;

            usuario.tipo = 'c';

            req.assert('id', 'Id não deve ser informado').isEmpty();
            req.assert('_delete', '_delete não deve ser informado').isEmpty();
            req.assert('usuario', 'Campo usuário obrigatório (usuário)').notEmpty();
            req.assert('email', 'Email obrigatorio').notEmpty();
            req.assert('email', 'Deve ser um email válido').isEmail();
            req.assert('senha', 'Deve ser cadastrada uma senha').notEmpty();

            let erros = req.validationErrors();

            if (erros) {
                console.log(erros);
                res.status(400).json({ erros });
                return;
            }

            let connection = new ConnectionFactory();
            let usuariosDao = new UsuariosDao(connection.on());

            usuariosDao.cadastrar(usuario)
            .then(result => {
                console.log('usuario cadastrado com sucesso');
                
                res.json({
                    status: 'ok',
                    msg: 'Usuário cadastrado com sucesso',
                    msgTecnica: result
                });
            })
            .catch(erro => {

                console.log('nao foi possivel efetuar o cadasro');
                console.log(erro);

                res.status(500).json({
                    status: 'error',
                    msg: 'Não foi possível efetuar o cadastro',
                    msgTecnica: {
                        code: erro.code,
                        message: erro.sqlMessage
                    }
                });
            });

            connection.off();
        }
    }

    alterar() {
        return (req, res) => {

            let usuario = req.body;

            req.assert('id', 'Campo id obrigatorio (id)').notEmpty();
            req.assert('_delete', '_delete não deve ser informado').isEmpty();
            req.assert('usuario', 'Campo usuário obrigatório (usuário)').notEmpty();
            // req.assert('email', 'Email obrigatorio').notEmpty();
            // req.assert('email', 'Deve ser um email válido').isEmail();
            req.assert('senha', 'Senha não pode ser alterada por este método').isEmpty();

            // se usuario ou id for diferente do usuario logado & usuario eh administrador
            if((req.usuario.id != usuario.id || req.usuario.usuario != usuario.usuario) && req.usuario.tipo != 'a') {

                let campo = ( (req.usuario.id != usuario.id) ? '- id' : '' );
                campo += ( (req.usuario.usuario != usuario.usuario) ? '- usuario' : '' );
                let msg = `Usuários que não são Administrador, não tem permissão de alterar outro usuário, apenas o seu mesmo. Campos: ${campo}`;
                
                req.assert('id', msg).isEmpty();
                req.assert('usuario', msg).isEmpty();
            }

            let erros = req.validationErrors();

            if (erros) {
                console.log(erros);
                res.status(400).json({ erros });
                return;
            }

            let connection = new ConnectionFactory();
            let usuariosDao = new UsuariosDao(connection.on());

            usuariosDao.alterar(usuario)
            .then(results => {
                console.log('usuario alterado');
                console.log(results);

                res.json({
                    status: 'ok',
                    msg: 'Usuário alterado com sucesso!'
                });
            })
            .catch(erro => {
                console.log('falha ao alterar usuario');
                console.log(erro);

                res.status(500).json({
                    status: 'error',
                    msg: 'Falha ao tentar alterar o usuário!',
                    msgTecnica: {
                        code: erro.code,
                        message: erro.sqlMessage
                    }
                });
            });
            
            connection.off();
            
        }
    }
}

module.exports = UsuariosController;