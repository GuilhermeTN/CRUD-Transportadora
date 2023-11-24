const { Router } = require("express");
const router = Router();
const path = require("path");
const { cadastrarUsuario } = require('../Infraestrutura/database');

router.get("/Create-Account", (req, res) => {
    const filepath = path.join(__dirname, "../pages/Create-Account.html");
    res.sendFile(filepath);
});

router.post("/Create-Account", (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !email || !senha) {
        console.log("Todos os campos são obrigatórios.");
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const usuario = { nome, email, senha };

    console.log("Antes de chamar cadastrarUsuario");
    // Chama a função para cadastrar o usuário no banco de dados
    cadastrarUsuario(usuario);
    console.log("Depois de chamar cadastrarUsuario");

    // Responde ao cliente
    res.send("Usuário cadastrado com sucesso!");
});

module.exports = router;