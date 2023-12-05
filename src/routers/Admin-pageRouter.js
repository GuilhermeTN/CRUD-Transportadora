const { Router } = require("express");
const router = Router();
const path = require("path");

const isAuthenticated = (req, res, next) => {
    req.session && req.session.usuario ? next() : res.redirect("/login-page");
};

router.get("/Admin-page", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/Admin-page.ejs"));
    res.render('Admin-Page', { usuario: req.session.usuario });
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/login-page"));
});

module.exports = router;
