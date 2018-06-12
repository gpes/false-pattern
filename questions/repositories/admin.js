module.exports = app => {
    let Admin = app.models.admin;

    let repository = {
        findAdminByUserAndPassword: async admin => {
            return await Admin.findOne({ 
                usuario: admin.usuario,
                senha: admin.senha 
            }) 
        }
    }

    return repository;
}