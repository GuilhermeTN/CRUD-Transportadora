const { Router } = require("express");
const router = Router();
const path = require("path");
const { cadastrarUsuario } = require('../Infraestrutura/database');

router.get("/Create-Account", (req, res) => {
    const filepath = path.join(__dirname, "../pages/Create-Account.html");
    res.sendFile(filepath);
});

router.post("/Create-Account", async (req, res) => {
    console.log("Rota /Create-Account acionada");

    const { nome, email, senha } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !email || !senha) {
        console.log("Campos obrigatórios não fornecidos.");
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const usuario = { nome, email, senha };

    // Chama a função para cadastrar o usuário no banco de dados
    cadastrarUsuario(usuario);

    console.log("Cadastrado com sucesso!");

    // Remova o redirecionamento automático para fins de depuração
    res.redirect("/Dashboard");
});

module.exports = router;