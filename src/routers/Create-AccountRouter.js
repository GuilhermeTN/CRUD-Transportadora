const { Router } = require("express");
const router = Router();
const path = require("path");
const { cadastrarUsuario } = require('../Infraestrutura/database');

router.get("/Create-Account", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/Create-Account.html"));
});

router.post("/Create-Account", async (req, res) => {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !email || !senha || !endereco) {
        return res.status(400).send("Todos os campos são obrigatórios, incluindo o endereço.");
    }

    // Crie o objeto usuario incluindo telefone e endereco
    const usuario = { nome, email, senha, telefone, endereco };

    // Chama a função para cadastrar o usuário no banco de dados
    cadastrarUsuario(usuario);

    // Remova o redirecionamento automático para fins de depuração
    res.redirect("/Dashboard");
});

module.exports = router;
