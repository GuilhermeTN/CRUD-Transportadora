const { Router } = require("express");
const router = Router();
const path = require("path");
const { atualizarUsuario } = require('../Infraestrutura/database');
const { verificarAutenticacao } = require('./authMiddleware');

router.get("/configuracao", verificarAutenticacao, (req, res) => {
    const filepath = path.join(__dirname, "../pages/usuario-config.ejs");

    // Passe os detalhes do usuário para a página
    res.render('usuario-config', { usuario: req.session.usuario });
});

router.post("/configuracao", (req, res) => {
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

  // Chame a função para atualizar os dados do usuário no banco de dados
  atualizarUsuario({ nome: name, telefone: phone, endereco: address, senha: password, id });


  res.redirect('/configuracao?success=true');
});

module.exports = router;