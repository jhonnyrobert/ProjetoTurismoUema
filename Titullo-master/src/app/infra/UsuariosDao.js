const md5 = require('md5');

class UsuariosDao {

    constructor(connection) {

        this._connection = connection;
    }

    // realiza login
    login(login) {

        return new Promise((resolve, reject) => {

            let user = login.usuario;
            let pass = login.senha;
    
            let query = `select id, nome, usuario, email, foto, sexo, nascimento, telefone, tipo
                         from usuarios where _delete = '' and usuario = '${user}' and senha = '${md5(pass)}'`;
            
            this._connection.query(query,
                (err, result) => {
                    if (err) {console.log(err); reject('Não foi possível buscar o usuário: '+err); return};

                    resolve(result);
                });
    
            console.log('[log]['+new Date()+']-- pegando usuário login');
        });
    }

    // retorna usuario logado
    logado(usuario) {

        return new Promise((resolve, reject) => {
            let query = `select id, nome, usuario, email, foto, sexo, nascimento, telefone, tipo, cpf
            from usuarios where _delete = '' and usuario = '${usuario}'`;

            this._connection.query(query,
            (err, result) => {
                if(err) reject('Não foi possível pegar o usuário logado: '+err);

                resolve(result);
            });
        });
    }

    // cadastra usuario
    cadastrar(usuario) {

        return new Promise((resolve, reject) => {

            let senha = usuario.senha;
            delete usuario.senha;
    
            let query = `insert into usuarios set ?, senha = '${md5(senha)}'`;
            
            this._connection.query(query, usuario,
                (err, result) => {
                    if (err) reject(err);

                    resolve(result);
                });
        });
    }

    cadastrarSemLogin(usuario) {
        return new Promise((resolve, reject) => {

            let senha = usuario.senha;
            delete usuario.senha;

            let qryUsuario = `insert into usuarios set ?, senha = '${md5(senha)}'`;

            this._connection.beginTransaction(errBegin => {
                if(errBegin) reject(errBegin);

                this._connection.query(qryUsuario, usuario, (errUsuario, result) => {
                    if(errUsuario) {this._connection.rollback(() => {reject(errUsuario);});return;}

                    let idUsuario = result.insertId;
                    let aluno = {
                        tipo: 'u',
                        idUsuario: idUsuario
                    };
                    console.log('>>> cadastro de usuário sem login: '+idUsuario);

                    this._connection.query(`insert into alunos set ?`, aluno, (errAluno, resultado) => {
                        if(errAluno) {this._connection.rollback(() => {reject(errAluno);});return;}

                        this._connection.query(`insert into usuarioEmpresa set idEmpresa = 1, idUsuario = ${idUsuario}`, (errEmpresa, resultEmpresa) => {
                            if(errEmpresa) {this._connection.rollback(() => {reject(errEmpresa);});return;}

                            this._connection.commit(erroCommit => {
                                if(erroCommit) {this._connection.rollback(() => {reject(erroCommit);});return;}
    
    
                                let resultados = {
                                    insertUsuario: result,
                                    insertAluno: resultado,
                                    insertEmpresa: resultEmpresa
                                }
    
                                resolve(resultados);
                            });
                        });

                    });
                });
            });
        });
    }

    listar(par) {
        
        return new Promise((resolve, reject) => {

            let id = (par.id) ? ` and id = ${par.id}` : '';
            let usuario = (par.usuario) ? ` and usuario like '%${par.usuario}%'` : '';
            let nome = (par.nome) ? ` and nome like '%${par.nome}%'` : '';
            let email = (par.email) ? ` and email like '%${par.email}%'` : '';
            let cpf = (par.cpf) ? ` and cpf like '%${par.cpf}%'` : '';
            let sexo = (par.sexo) ? ` and sexo = '${par.sexo}'` : '';
            let nascimento = (par.nascimento) ? ` and nascimento = '${par.nascimento}'` : '';
            let telefone = (par.telefone) ? ` and telefone = '${par.telefone}'` : '';
            let tipo = (par.tipo) ? ` and tipo = '${par.tipo}'` : '';

            let query = `select id, nome, usuario, email, foto, sexo, nascimento, ddd, telefone, tipo, cpf
                         from usuarios where _delete = '' ${id} ${usuario} ${nome} ${email} ${cpf} ${sexo} ${nascimento} ${telefone} ${tipo}`;
            
            this._connection.query(query, (err, results) => {
                if(err) reject(err);

                resolve(results);
            });
        });
    }

    alterar(usuario) {

        return new Promise((resolve, reject) => {

            let id = usuario.id;
            let user = usuario.usuario;
            let email = usuario.email;

            delete usuario.id;
            delete usuario.usuario;
            delete usuario.email;

            let query = `update usuarios set ? where _delete = '' and id = ${id} and usuario = '${user}'`;

            this._connection.query(query, usuario, (err, results) => {
                if(err) reject(err);

                resolve(results);
            });
        });
    }
}

module.exports = UsuariosDao;