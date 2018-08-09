const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = app => {
    const calcSchema = new Schema({
        usuario: { type: String, required: true },
        exp: { type: Number, required: true },
        commmits: [{
            endpoint: { type: String, required: true },
            quant_commits: { type: Number, required: true },
            tempo: { type: String, required: true }
        }]
    })

    return mongoose.model('calcs', calcSchema)
}