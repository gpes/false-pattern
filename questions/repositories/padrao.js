module.exports = app => {
    let Padrao = app.models.padrao;
    
    let repository = {
        create: async data => {
            let padrao = new Padrao(data);
            return await padrao.save();
        },

        getAll: async () => {
            return await Padrao.find({}, 'padrao categoria')
        },

        getTermosByCategoria: async categoria => {
            return await Padrao.find({
                categoria: categoria
            }, 'termos' );
        }
    }

    return repository;
}