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
                let indicios = await indiciosService.randomIndicios();
                
                req.session.indicios = indicios;
                req.session.current_position = 0;

                if(indicios.length > 0) {
                    res.redirect('/classification');
                } else {
                    res.redirect('/finished');
                }
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
                    indicio,
                    current_position: req.session.current_position,
                    total_length: req.session.indicios.length
                });
            } catch(e) {
                console.log(e)
                res.redirect('/error')
            }
        }
    }
}