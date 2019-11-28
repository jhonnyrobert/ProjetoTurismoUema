const ConnectionFactory = require('../infra/ConnectionFactory');
const UsuariosDao = require('../infra/UsuariosDao');
const jwt = require('jsonwebtoken');
const secrets = 'minhafrasesecretaehextremamentesecreta';

class AuthController {

    constructor() {
        this._auth;
    }

    // autentica um usuario
    autenticar() {

        return (req, res) => {

            let connection = new ConnectionFactory();
            let usuariosDao = new UsuariosDao(connection.on());

            let login = req.body;

            usuariosDao.login(login)
            .then(usuarios => {
                if(!usuarios.length) {
                    
                    console.log('usuario nao encontrado');
                    res.status(401).json({
                        status: 'error',
                        msg: 'Usuário ou senha inválidos'
                    });
                } else {

                    let token = jwt.sign({
                        id: usuarios[0].id,
                        usuario: usuarios[0].usuario,
                        tipo: usuarios[0].tipo
                    }, secrets, {
                        // expira em 24h
                        expiresIn: 84600
                    });

                    console.log(">> Token criado e sendo enviado no header da requisicao");
                    res.set('x-access-token', token);
                    res.end();
                }

            })
            .catch(erro => {
                res.status(500).json({
                    status: 'error',
                    msg: 'Não foi possível efetuar o login',
                    msgTecnica: {
                        code: erro.code,
                        message: erro.sqlMessage
                    }
                });
            });

            connection.off();
        }
    }

    // cadasra um usuario e vincular como aluno
    cadastrar() {

        return (req, res) => {
            
            let usuario = req.body;

            usuario.tipo = 'l';

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

            usuariosDao.cadastrarSemLogin(usuario)
            .then(result => {
                console.log('usuario cadastrado com sucesso');
                
                res.json({
                    status: 'ok',
                    msg: 'Usuário cadastrado com sucesso',
                    msgTecnica: result
                });

                connection.off();
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

                connection.off();
            });

        }
    }

    // verifica o login do usuario logado
    verificarLogin() {
        return (req, res, next) => {

            let token = req.headers['x-access-token'];

            if (token) {

                console.log(">> verificando token...");
                jwt.verify(token, secrets, (err, decoded) => {

                    if (err) {

                        console.log('>> token rejeitado');
                        res.sendStatus(401);
                        return;
                    }

                    // console.log(subject);

                    console.log(decoded);
                    req.usuario = decoded;
                    next()
                });
            } else {

                console.log('>> token nao foi enviado');
                res.sendStatus(401);
                // next()  //> inserido para passar sem autenticação
            }
        }
    }
}

module.exports = AuthController;