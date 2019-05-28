const axios = require('axios');

module.exports = app => {
    const indiciosService = app.services.indicios;

    return {
        render: async (req, res) => {
            try {
                // let { rows } = await indiciosService.findAll();

                let axiosResponse = 
                    await axios.get('https://raw.githubusercontent.com/gpes/false-pattern/master/fp-detection/src/main/java/br/edu/ifpb/gpes/fp/detection/AppFalsePatternFileGenerator.java')

                res.render('index', {
                    code: axiosResponse.data
                });
            } catch(e) {
                res.redirect('/error')
                console.log(e.message)
            }
        }
    }
}