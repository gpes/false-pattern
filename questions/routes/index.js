// const passportGithub = require('../libs/auth/github');

function authUsuario(req, res, next) {
    if(req.session.id_usuario === undefined || req.session.id_usuario === null) res.redirect('/');
    else next();
    // if(req.isAuthenticated()) next();
    
    // res.redirect('/')
    
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
    let passportGithub = app.libs.auth.github;

    // Github router
    app.get('/auth/github', passportGithub.authenticate('github', { scope : [ 'user:email' ] }))
    app.get('/auth/github/callback', passportGithub.authenticate('github', { failureRedirect: '/' }), (req, res) => {
        // console.log(req.user._id)
        req.session.id_usuario = req.user._id;
        res.redirect('/questionario')
    })

    // render
    app.get('/', (req, res) => {
        res.render('index');
    });
    // app.get('/usuario/cadastrar', usuarioController.post);

    // render
    // Precisa colocar o authUsuario
    app.get('/questionario', padraoController.getRandomAll);
    app.post('/questionario/responder', authUsuario, respostaController.post);
    app.get('/questionario/finalizar', authUsuario, usuarioController.finish);

    // render
    app.get('/admin', (req, res) => {
        res.render('admin/admin');    
    })
    app.post('/admin/logar', adminController.login);
    app.get('/admin/logout', authAdmin, adminController.logout);
    
    // render
    app.get('/admin/dashboard', (req, res) => {
        res.render('admin/dashboard', {
            respostas: []
        })
    });

    app.post('/admin/dashboard/buscar', respostaController.retrieve);
    
    // render
    app.get('/admin/padrao/cadastrar-padrao', authAdmin, (req, res) => {
        res.render('admin/cadastrar-padrao');
    })
    app.post('/admin/padrao/cadastrar', authAdmin, padraoController.post);
    
    // render
    app.get('/admin/padrao/atualizar-padrao', (req, res) => {
        res.render('admin/atualizar-padrao')
    })
    app.post('/admin/padrao/atualizar', padraoController.updatePadrao);

}