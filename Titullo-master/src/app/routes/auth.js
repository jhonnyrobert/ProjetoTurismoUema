const AuthController = require('../controllers/AuthController');
module.exports = (app) => {

    let authController = new AuthController();

    //> libera autenticar e cadastrar sem token e demais rotas somente com token
    //> autenticar
    app.post('/noauth/usuario', authController.cadastrar());
    app.post('/autenticar', authController.autenticar());

    //> verifica login
    app.use('/*', authController.verificarLogin());
}