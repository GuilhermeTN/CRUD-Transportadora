const { Router } = require("express");
const router = Router();
const path = require("path");
const { atualizarUsuario } = require('../Infraestrutura/database');
const { verificarAutenticacao } = require('./authMiddleware');
const bcrypt = require('bcrypt');

router.get("/configuracao", verificarAutenticacao, (req, res) => {
    const filepath = path.join(__dirname, "../pages/usuario-config.ejs");

    // Passe os detalhes do usuário para a página
    res.render('usuario-config', { usuario: req.session.usuario });
});

router.post("/configuracao", async (req, res) => {
    console.log("Corpo da solicitação:", req.body);

    const { name, phone, address, password, id } = req.body;

    // Verifique se todos os dados necessários foram fornecidos
    if (!name || !phone || !address || !password || !id) {
        console.log("Campos que estão faltando:", {
            name: !name,
            phone: !phone,
            address: !address,
            password: !password,
            id: !id,
        });
        console.log("Todos os campos são obrigatórios.");
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        // Hash da nova senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Chame a função para atualizar os dados do usuário no banco de dados
        await atualizarUsuario({ nome: name, telefone: phone, endereco: address, senha: hashedPassword, id });

        console.log("Dados do usuário atualizados com sucesso!");

        // Redirecione para o Dashboard após a atualização
        res.redirect('/Dashboard');
    } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
        res.status(500).send("Erro interno do servidor ao atualizar a senha.");
    }
});

module.exports = router;