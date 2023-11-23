const { Router } = require("express");
const router = Router();
const path = require("path");
const { autenticarUsuario } = require('../Infraestrutura/database');

router.post("/Login-Page", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Email e senha são obrigatórios.");
    }

    try {
        const usuarioAutenticado = await autenticarUsuario(email, senha);

        if (usuarioAutenticado) {
            req.session.usuario = {
                id: usuarioAutenticado.id,
                nome: usuarioAutenticado.nome,
                email: usuarioAutenticado.email,
                isAdmin: !!usuarioAutenticado.isAdmin, // Garante que isAdmin é booleano
            };


            if (usuarioAutenticado.isAdmin) {
                return res.redirect("/Admin-page");
            }

            return res.redirect("/Dashboard");
        } else {
            return res.status(401).send("Falha na autenticação. Verifique suas credenciais.");
        }
    } catch (error) {
        console.error("Erro durante autenticação:", error);
        return res.status(500).send("Erro interno do servidor.");
    }
});

module.exports = router;