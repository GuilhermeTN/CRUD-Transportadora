const { Router } = require("express");
const router = Router();
const path = require("path");
const { verificarAutenticacao } = require('./authMiddleware');
const { autenticarUsuarioPorId, mysqlConnection } = require('../Infraestrutura/database');

router.get("/configuracao", verificarAutenticacao, async (req, res) => {
    try {
        const usuario = await autenticarUsuarioPorId(req.session.usuario.id);
        res.render('usuario-config', { usuario });
    } catch (error) {
        console.error("Erro ao obter usuário para a página de configuração:", error);
        res.status(500).send("Erro interno do servidor.");
    }
});

module.exports = router;