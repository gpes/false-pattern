module.exports = app => {
    const respostasService = app.services.respostas;
    
    return {
        answer: async (req, res) => {
            let data = await respostasService.answer(req.session.indicios[req.session.current_position].id, req.body.answer);
            
            if(req.session.current_position === (req.session.indicios.length - 1)) {
                res.redirect('/finished')
            } else {
                ++req.session.current_position;
                
                res.redirect('/classification');
            }
        },

        finished: (req, res) => {
            req.session.destroy();
            res.render('finished')
        }
    }
}