const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = app => {
    const respostaSchema = new Schema({
        padrao: { type: String, required: true },
        termos: { type: String, required: true }
    })
    
    const suguestaoSchema = new Schema({
        padrao: { type: String, required: true },
        termo: { type: String, required: true } 
    }) 

    const mainSchema = new Schema({
        resposta: [ respostaSchema ],
        seguestao: [ suguestaoSchema ],
        data: { type: Date, default: Date.now }
    })

    return mongoose.model('respostas', mainSchema);
}