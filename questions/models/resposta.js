const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = app => {
    const respostaSchema = new Schema({
        padrao: { type: String, required: true },
        termos: [ 
            { type: String, required: true } 
        ]
    })
    
    const suguestaoSchema = new Schema({
        padrao: { type: String, required: true },
        tipo: { type: String, required: true },
        nome: { type: String, required: true } 
    }) 

    const mainSchema = new Schema({
        resposta: [ respostaSchema ],
        suguestao: [ suguestaoSchema ],
        data: { type: Date, default: Date.now }
    })

    return mainSchema;
}