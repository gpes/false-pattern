const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

module.exports = app => {

    let respostaModel = app.models.resposta;
    
    const usuarioSchema = new Schema({
        formacao: { type: String, required: true },
        experiencia: { type: String, required: true },
        resposta: respostaModel 
    })

    return mongoose.model('usuarios', usuarioSchema);
}