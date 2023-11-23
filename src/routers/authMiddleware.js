const verificarAutenticacao = (req, res, next) => {
    if (req.session && req.session.usuario) {
        const { isAdmin } = req.session.usuario;

        // Se estiver autenticado, prossiga para a próxima rota
        return next();
    }

    // Se não estiver autenticado, redirecione para a página de login
    return res.redirect('/Login-Page');
};

module.exports = { verificarAutenticacao };