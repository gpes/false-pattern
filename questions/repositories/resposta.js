module.exports = app => {
    let Usuario = app.models.usuario; 

    let repository = {
        create: async (id_usuario, data) => {
            return await Usuario.findByIdAndUpdate(id_usuario, { $set: data } )
        },

        retrieveUsersWithAnwsers: async data => {
            return await Usuario.find(data);
        }
    }

    return repository;
}