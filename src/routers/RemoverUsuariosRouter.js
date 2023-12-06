const { Router } = require("express");
const router = Router();
const path = require("path");
const { obterTodosUsuarios } = require('../Infraestrutura/database');


const isAuthenticated = (req, res, next) => {
    req.session && req.session.usuario ? next() : res.redirect("/login-page");
};

router.get('/RemoverUsuario', isAuthenticated, async (req, res) => {
    try {
        const usuarios = await obterTodosUsuarios();
        const filepath = path.join(__dirname, '../pages/Remover_usuario.ejs');
        res.render('Remover_usuario', { usuario: req.session.usuario, usuarios });
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).send('Erro ao obter usuários.');
    }
});

router.post('/removerUsuario/:id', isAuthenticated, async (req, res) => {
    const usuarioId = req.params.id;

    try {

        await removerUsuario(usuarioId);

        res.send("Removido com sucesso")
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).send('Erro ao remover usuário.');
    }
});


module.exports = router;