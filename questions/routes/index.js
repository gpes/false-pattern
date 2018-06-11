function authUsuario(req, res, next) {
    if(req.session.id_usuario === undefined || req.session.id_usuario === null) res.redirect('/');
    next();
}

module.exports = app => {
    let padraoController = app.controllers.padrao;
    let respostaController = app.controllers.resposta;
    let usuarioController = app.controllers.usuario;

    // render
    app.get('/', (req, res) => {
        res.render('usuario');
    });
    app.post('/usuario/cadastrar', usuarioController.post);

    // render
    app.get('/q', authUsuario, padraoController.getRandomAll);
    app.post('/q/responder', authUsuario, respostaController.post);
    app.get('/q/finalizar', usuarioController.finish);

    // render
    app.get('/padrao', (req, res) => {
        res.render('cadastrar');
    })
    app.post('/padrao/cadastrar', padraoController.post);

}