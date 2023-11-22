const { Router } = require("express");
const router = Router();
const path = require("path");
const { autenticarUsuario } = require('../Infraestrutura/database'); // Importa a função para autenticar usuário

router.post("/Login-Page", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    try {
        const usuario = await autenticarUsuario(email, senha);

        if (usuario.senhaCorreta) {
            if (usuario.isAdmin) {
                res.redirect("/Admin-page");
            } else {
                res.send("Você é um usuário normal.");
            }
        } else {
            res.status(401).send("Falha na autenticação. Verifique suas credenciais.");
        }
    } catch (error) {
        console.error("Erro durante autenticação:", error);
        res.status(500).send("Erro interno do servidor.");
    }
});

module.exports = router;