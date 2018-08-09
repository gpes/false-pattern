module.exports = app => {
    let Usuario = app.models.usuario;

    let repository = {
        create: async data => {
            let usuario = new Usuario(data)
            return await usuario.save();
        },

        getOneByUsername: async username => {
            return await Usuario.findOne({ 
                username: username
            }, 'username')
        }
    }

    return repository;
}