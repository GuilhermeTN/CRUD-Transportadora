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


router.get("/Admin-page", isAuthenticated,(req, res)=>{
    const filepath = path.join(__dirname,"../pages/Admin-page.html");
    res.sendFile(filepath);
});

router.get("/logout", (req, res) => {
    // Lógica para limpar a sessão (exemplo com express-session)
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao fazer logout:", err);
            res.status(500).send("Erro ao fazer logout");
        } else {
            // Redirecionar para a página de login após o logout
            res.redirect("/login-page");
        }
    });
});
module.exports = router;