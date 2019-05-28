module.exports = app => {
    const indiciosService = app.services.indicios;

    return {
        render: async (req, res) => {
            try {
                let { rows } = await indiciosService.findAll();
                console.log('Indicios:', rows);

                res.render('index');
            } catch(e) {
                res.redirect('/error')
                console.log(e.message)
            }
        }
    }
}