const { Router } = require("express");
const router = Router();
const path = require("path");
const database = require('../Infraestrutura/database');

router.get("/Verificarfretes", async (req, res) => {
    // Verifica se req.session.usuario está definido
    if (req.session.usuario) {
        try {
            const fretes = await database.obterFretesPorUsuario(req.session.usuario.id);
            res.render('verificar-fretes', { usuario: req.session.usuario, fretes });
        } catch (error) {
            console.error('Erro ao obter fretes do banco de dados:', error);
            // Lide com o erro de maneira apropriada
            res.redirect('/Login-Page');
        }
    } else {
        // Caso não esteja definido, você pode redirecionar para a página de login ou tomar outra ação adequada.
        res.redirect('/Login-Page');
    }
});

module.exports = router;