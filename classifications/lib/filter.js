module.exports = (req, res, next) => {
    if(!req.session.indicios) return res.redirect('/');
    next();
}