const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = app => {
    const padraoSchema = new Schema({
        padrao: {
            type: String, required: true
        },
        categoria: {
            type: String, required: true
        },
        descricao: {
            type: String, required: true
        },
        imagem: {
            type: String, required: true
        },
        termos: [{
            tipo: { type: String, required: true },
            nome: { type: String, required: true }
        }]
    })
    
    return mongoose.model('padroes', padraoSchema);
}



