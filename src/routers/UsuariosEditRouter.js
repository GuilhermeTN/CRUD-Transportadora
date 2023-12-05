const { Router } = require("express");
const router = Router();
const path = require("path");

const isAuthenticated = (req, res, next) => {
    req.session && req.session.usuario ? next() : res.redirect("/login-page");
};

router.get("/Usuarios", isAuthenticated, (req, res)=>{
    const filepath = path.join(__dirname,"../pages/Usuarios.ejs");
    res.sendFile(filepath);
    res.render('usuarios', { usuario: req.session.usuario });
});

module.exports = router;