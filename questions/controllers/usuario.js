module.exports = app => {
    
    let usuarioRepository = app.repositories.usuario;

    let controller = {
        post: async (req, res) => {
            try {
                // req.user vem do passport
                let usuario = await usuarioRepository.create(req.user);
                
                req.session.id_usuario = usuario._id;
                
                res.redirect('/questionario');
            } catch(e) {
                console.log(e);
                res.status(500).send('Falha ao processar a requisição')
            }   
        },

        finish: (req, res) => {
            // req.session.id_usuario = null;
            req.session.destroy();
            req.logout();
            res.redirect('/');
        }
    }

    return controller;

}