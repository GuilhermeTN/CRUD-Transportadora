const { Router } = require("express");
const router = Router();
const path = require("path");


router.get("/Verificarfretes", (req, res)=>{
    const filepath = path.join(__dirname, "../pages/verificar-fretes.ejs");

    // Verifica se req.session.usuario está definido
    if (req.session.usuario) {
        res.render('verificar-fretes', { usuario: req.session.usuario });
    } else {
        // Caso não esteja definido, você pode redirecionar para a página de login ou tomar outra ação adequada.
        res.redirect('/Login-Page');
    }
});
module.exports = router;