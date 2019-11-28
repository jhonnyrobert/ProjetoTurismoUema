const UsuariosController = require('../controllers/UsuariosController');

module.exports = (app) => {

    let usuariosController = new UsuariosController();

    app.get('/usuarios/logado', usuariosController.usuarioLogado());

    // cadastro de usuário em auth.js
    app.route('/usuarios')
        .get(usuariosController.listar())
        .post(usuariosController.cadastrar())
        .put(usuariosController.alterar());
        
}