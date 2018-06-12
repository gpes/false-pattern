function authUsuario(req, res, next) {
    if(req.session.id_usuario === undefined || req.session.id_usuario === null) res.redirect('/');
    next();
}

function authAdmin(req, res, next) {
    if(req.session.id_admin === undefined || req.session.id_admin === null) res.redirect('/admin');
    next();
}

module.exports = app => {
    let padraoController = app.controllers.padrao;
    let respostaController = app.controllers.resposta;
    let usuarioController = app.controllers.usuario;
    let adminController = app.controllers.admin;

    // render
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.post('/usuario/cadastrar', usuarioController.post);

    // render
    app.get('/questionario', authUsuario, padraoController.getRandomAll);
    app.post('/questionario/responder', authUsuario, respostaController.post);
    app.get('/questionario/finalizar', authUsuario, usuarioController.finish);

    // render
    app.get('/admin', (req, res) => {
        res.render('admin/admin');    
    })
    app.post('/admin/logar', adminController.login);
    app.get('/admin/logout', authAdmin, adminController.logout);
    
    // render
    app.get('/admin/dashboard', authAdmin, (req, res) => {
        res.render('admin/dashboard')
    });
    
    // render
    app.get('/admin/padrao', authAdmin, (req, res) => {
        res.render('admin/cadastrar-padrao');
    })
    app.post('/admin/padrao/cadastrar', authAdmin, padraoController.post);


}