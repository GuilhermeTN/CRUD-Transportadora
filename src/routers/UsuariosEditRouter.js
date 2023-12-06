const { Router } = require("express");
const router = Router();
const path = require("path");
const { obterTodosUsuarios } = require('../Infraestrutura/database');


const isAuthenticated = (req, res, next) => {
    req.session && req.session.usuario ? next() : res.redirect("/login-page");
};

router.get('/Usuarios', isAuthenticated, async (req, res) => {
    try {
        const usuarios = await obterTodosUsuarios();
        const filepath = path.join(__dirname, '../pages/Usuarios.ejs');
        res.render('Usuarios', { usuario: req.session.usuario, usuarios });
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).send('Erro ao obter usuários.');
    }
});


module.exports = router;