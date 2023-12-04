const verificarAutenticacao = (req, res, next) => {
    req.session && req.session.usuario ? next() : res.redirect('/Login-Page');
};
module.exports = { verificarAutenticacao };
