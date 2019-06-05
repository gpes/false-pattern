const filter = require('./../lib/filter');

module.exports = app => {
    const indiciosController = app.controllers.indicios;
    const respostasController = app.controllers.respostas;

    app.get('/', indiciosController.initial);
    app.get('/generate', indiciosController.generate);
    app.get('/classification', filter, indiciosController.render);

    app.post('/answer', filter, respostasController.answer);
    app.get('/finished', filter, respostasController.finished);
    
    app.get('/error', (req, res) => res.render('error'));
}