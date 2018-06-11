module.exports = app => {
    let Usuario = app.models.usuario; 

    let repository = {
        create: async (id_usuario, data) => {
            return await Usuario.findByIdAndUpdate(id_usuario, { resposta: data } )
        }
    }

    return repository;
}