const { Router } = require("express");
const router = Router();
const path = require("path");
const { cadastrarUsuario } = require('../Infraestrutura/database');

function generateRandomToken() {
    return Math.floor(10000 + Math.random() * 90000);
}

router.get("/Create-Account", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/Create-Account.html"));
});

router.post("/Create-Account", async (req, res) => {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !email || !senha || !endereco) {
        return res.status(400).send("Todos os campos são obrigatórios, incluindo o endereço.");
    }

    // Gera o token antes de criar o objeto usuario
    const token = generateRandomToken();

    // Cria o objeto usuario incluindo o token
    const usuario = { nome, email, senha, isAdmin: undefined, telefone, endereco, token };

    // Chama a função para cadastrar o usuário no banco de dados
    await cadastrarUsuario(usuario);  // Agora espera pela conclusão da função antes de prosseguir

    // Remova o redirecionamento automático para fins de depuração
    res.redirect("/Dashboard");
});

module.exports = router;
