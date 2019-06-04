const axios = require('axios');

module.exports = app => {
    const indiciosService = app.services.indicios;

    return {
        initial: (req, res) => {
            try {
                res.render('index');
            } catch(e) {
                console.log(e);
                res.redirect('/error');
            }
        },

        generate: async (req, res) => {
            try {
                let { rows } = await indiciosService.randomIndicios();
                
                req.session.indicios = rows.slice(0, 10);
                req.session.current_position = 0;

                res.redirect('/classification');
            } catch(e) {
                console.log(e)
                res.redirect('/error');
            }
        },

        render: async (req, res) => {
            try {
                let indicio = req.session.indicios[req.session.current_position];

                let axiosResponse = 
                    await axios.get(indicio.link);
                
                indicio.codigo = axiosResponse.data;

                res.render('classification', {
                    indicio
                });
            } catch(e) {
                console.log(e)
                res.redirect('/error')
            }
        }
    }
}