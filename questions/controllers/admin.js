const crypto = require('crypto');

module.exports = app => {
    
    let adminRepository = app.repositories.admin;

    let controller = {
        login: async (req, res) => {

            req.body.senha = crypto.createHash('md5')
                .update(req.body.senha)
                .digest('hex');

            try {
                let admin = await adminRepository.findAdminByUserAndPassword(req.body)
                
                if(admin === null) res.redirect('/admin')
                else {
                    req.session.id_admin = admin._id; 

                    res.redirect('/admin/dashboard')
                } 
            } catch(e) {
                res.status(500).send('Falha ao processar a rquisição');
            }
        },

        logout: (req, res) => {
            // req.session.id_admin = null;
            req.session.destroy();
            res.redirect('/admin')
        }
    }

    return controller;
}