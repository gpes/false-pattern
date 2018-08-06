const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

module.exports = app => {

    // let respostaModel = app.models.resposta;
    
    const respostaSchema = new Schema({
        padrao: { type: String, required: true },
        categoria: { type: String, required: true },
        termos: [ 
            { type: String, required: true } 
        ]
    })
    
    const suguestaoSchema = new Schema({
        padrao: { type: String, required: true },
        tipo: { type: String, required: true },
        nome: { type: String, required: true } 
    }) 

    // const mainSchema = new Schema({
    //     resposta: [ respostaSchema ],
    //     suguestao: [ suguestaoSchema ],
    //     data: { type: Date, default: Date.now }
    // })

    const usuarioSchema = new Schema({
        // formacao: { type: String, required: true },
        // experiencia: { type: String, required: true },
        email: { type: String },
        displayName: { type: String },
        public_repos: { type: Number, required: true },
        resposta: [ respostaSchema ],
        suguestao: [ suguestaoSchema ], 
    })

    return mongoose.model('usuarios', usuarioSchema);
}