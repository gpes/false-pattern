module.exports = app => {
    const indiciosController = app.controllers.indicios;
    const respostasController = app.controllers.respostas;

    app.get('/', indiciosController.initial);
    app.get('/generate', indiciosController.generate);
    app.get('/classification', indiciosController.render);

    app.post('/answer', respostasController.answer);
    app.get('/finished', respostasController.finished);
    
    app.get('/error', (req, res) => res.render('error'));
}