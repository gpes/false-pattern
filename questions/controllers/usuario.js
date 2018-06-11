module.exports = app => {
    
    let usuarioRepository = app.repositories.usuario;

    let controller = {
        post: async (req, res) => {
            try {
                let usuario = await usuarioRepository.create(req.body);
                
                req.session.id_usuario = usuario._id;
                
                res.redirect('/q');
            } catch(e) {
                console.log(e);
                res.status(500).send('Falha ao processar a requisição')
            }   
        },

        finish: (req, res) => {
            req.session.destroy();
            res.redirect('/');
        }
    }

    return controller;

}