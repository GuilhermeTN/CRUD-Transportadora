const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = require("../routers/index");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//config do bodyparse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const { cadastrarUsuario } = require('../Infraestrutura/database');
const loginRouter = require("../routers/Login-PageRouter");
app.use("/", loginRouter);
app.get("/Login-Page", (req, res) => {
    const filepath = path.join(__dirname, "../pages/Login-page.html");
    res.sendFile(filepath);
});

app.use(express.static(path.join(__dirname, "../../")));
app.use(express.static(path.join(__dirname, "../../src/pages")));

router(app);

app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se todos os campos necessários foram fornecidos
    if (!nome || !email || !senha) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const usuario = { nome, email, senha };

    // Chama a função para cadastrar o usuário no banco de dados
    cadastrarUsuario(usuario);

    // Responde ao cliente
    res.redirect("/Admin-page");
});

app.listen(port, (error) => {
    if (error) {
        console.log("Deu Erro");
        return;
    }
    console.log("Subiu Certinho")
    console.log(`Servidor rodando na porta ${port}`);
});
