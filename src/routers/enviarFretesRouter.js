const { Router } = require("express");
const router = Router();
const path = require("path");
const database = require('../Infraestrutura/database');

router.get("/Enviarfretes", (req, res) => {
    const filepath = path.join(__dirname, "../pages/enviar-fretes.ejs");

    // Verifica se req.session.usuario está definido
    if (req.session.usuario) {
        res.render('enviar-fretes', { usuario: req.session.usuario });
    } else {
        // Caso não esteja definido, você pode redirecionar para a página de login ou tomar outra ação adequada.
        res.redirect('/Login-Page');
    }
});

router.post('/enviarfretes', async (req, res) => {
    try {
        const { localEntrega, tamanhoPacote, total } = req.body;
        const idUsuario = req.session.usuario.id;

        // Insira os dados do frete na tabela de fretes
        await database.inserirFrete({ idUsuario, localEntrega, valorFrete: total, tamanhoPacote });

        // Redirecione para /verificarfretes após o envio bem-sucedido
        res.redirect('/verificarfretes?success=true');
    } catch (error) {
        console.error('Erro ao processar envio de frete:', error);
        // Redirecione para /verificarfretes com mensagem de erro
        res.redirect('/verificarfretes?success=false');
    }
});

module.exports = router;
