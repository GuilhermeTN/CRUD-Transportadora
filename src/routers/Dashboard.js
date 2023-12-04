const { Router } = require("express");
const router = Router();
const path = require("path");

const isAuthenticated = (req, res, next) => {
    req.session && req.session.usuario ? next() : res.redirect("/login-page");
};

router.get("/Dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/usuario-Dashboard.html"));
});

router.get("/logout", (req, res) => {
    // Destruir a sessão
    req.session.destroy((err) => {
        err && console.error("Erro ao destruir a sessão:", err);
        // Redirecionar para a página de login após o logout
        res.redirect("/login-page");
    });
});

module.exports = router;
