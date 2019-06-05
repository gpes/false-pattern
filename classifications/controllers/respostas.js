module.exports = app => {
    return {
        answer: (req, res) => {
            console.log(req.body)

            // data store

            if(req.session.current_position === 10) {
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