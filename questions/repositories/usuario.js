module.exports = app => {
    let Usuario = app.models.usuario;

    let repository = {
        create: async data => {
            let usuario = new Usuario(data)
            return await usuario.save();
        }
    }

    return repository;
}