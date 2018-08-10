const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = app => {
    const calcSchema = new Schema({
        usuario: { type: String, required: true },
        exp: { type: Number, required: true },
        pulls: [{
            endpoint: { type: String },
            quant_commits: { type: Number },
            tempo: { type: String }
        }]
    })

    return mongoose.model('calcs', calcSchema)
}