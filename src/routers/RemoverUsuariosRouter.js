const express = require("express");
const router = express.Router();
const { obterTodosUsuarios, removerUsuario } = require('../Infraestrutura/database');

const isAuthenticated = (req, res, next) => {
  req.session && req.session.usuario ? next() : res.redirect("/login-page");
};

// Rota para exibir a página de remoção de usuários
router.get('/RemoverUsuario', isAuthenticated, async (req, res) => {
  try {
    const usuarios = await obterTodosUsuarios();
    res.render('Remover_usuario', { usuario: req.session.usuario, usuarios });
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).send('Erro ao obter usuários.');
  }
});

router.post('/remover-usuario/:id', isAuthenticated, async (req, res) => {
  const userId = req.params.id;

  try {
    await removerUsuario(userId);
    res.status(200).send('Usuário removido com sucesso.');
  } catch (error) {
    console.error(`Erro ao remover usuário ${userId}:`, error);
    res.status(500).send('Erro ao remover usuário.');
  }
});

module.exports = router;
