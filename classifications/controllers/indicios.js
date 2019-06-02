const axios = require('axios');

module.exports = app => {
    const indiciosService = app.services.indicios;

    return {
        initial: (req, res) => {
            try {
                res.render('index');
            } catch(e) {
                res.redirect('/error');
                console.log(e.message);
            }
        },

        render: async (req, res) => {
            try {
                // let { rows } = await indiciosService.findAll();

                let axiosResponse = 
                    await axios.get('https://raw.githubusercontent.com/gpes/false-pattern/master/fp-detection/src/main/java/br/edu/ifpb/gpes/fp/detection/AppFalsePatternFileGenerator.java')

                res.render('classification', {
                    code: axiosResponse.data
                });
            } catch(e) {
                res.redirect('/error')
                console.log(e.message)
            }
        }
    }
}