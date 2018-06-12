const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = app => {
    let adminSchema = new Schema({
        usuario: { type: String, required: true },
        senha: { type: String, required: true }
    });

    return mongoose.model('admins', adminSchema)
}