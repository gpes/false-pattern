module.exports = app => {
    let padraoController = app.controllers.padrao;

    app.get('/', padraoController.getRandomAll);

    app.post('/responder', (req, res) => {
        console.log(req.body)

        res.redirect('/')
    })

    app.get('/cadastrar', (req, res) => {
        res.render('cadastrar');
    })

    app.post('/padrao', padraoController.create);
}