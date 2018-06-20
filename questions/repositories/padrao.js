module.exports = app => {
    let Padrao = app.models.padrao;
    
    let repository = {
        create: async data => {
            let padrao = new Padrao(data);
            return await padrao.save();
        },

        getAll: async () => {
            return await Padrao.find({}, 'padrao categoria descricao imagem')
        },

        getTermosByCategoria: async categoria => {
            return await Padrao.find({
                categoria: categoria
            }, 'termos' );
        },

        updateDescAndImgByPadrao: async data => {
            return await Padrao.update({
                padrao: data.padrao
            }, 
            {
                $set: { 
                    descricao: data.descricao,
                    imagem: data.imagem 
                }
            })
        }
    }

    return repository;
}