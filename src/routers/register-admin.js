const { Router } = require("express");
const router = Router();
const path = require("path");
const { cadastrarUsuario } = require('../Infraestrutura/database');

router.get("/register-admin", (req, res) => {
    const filepath = path.join(__dirname, "../pages/cadastro-admin.html");
    res.sendFile(filepath);
});

router.post("/register-admin", (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const usuario = { nome, email, senha, isAdmin: true };

    // Chama a função para cadastrar o usuário no banco de dados como admin
    cadastrarUsuario(usuario);

    // Redireciona para a página de admin após o cadastro
    res.redirect("/Admin-page");
});

module.exports = router;