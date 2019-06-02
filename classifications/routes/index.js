module.exports = app => {
    const indiciosController = app.controllers.indicios;
    
    app.get('/', indiciosController.initial);
    app.get('/classification', indiciosController.render);
    app.get('/error', (req, res) => res.render('error'));

}