const { Router } = require("express");
const router = Router();
const path = require("path");

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.usuario) {
        // Se o usuário estiver autenticado, permita o acesso à rota
        return next();
    } else {
        // Se não estiver autenticado, redirecione para a página de login
        res.redirect("/login-page");
    }
};

router.get("/Dashboard", isAuthenticated, (req, res)=>{
    const filepath = path.join(__dirname,"../pages/usuario-Dashboard.html");
    res.sendFile(filepath);
});

router.get("/logout", (req, res) => {
    // Destruir a sessão
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao destruir a sessão:", err);
        }
        // Redirecionar para a página de login após o logout
        res.redirect("/login-page");
    });
});

module.exports = router;