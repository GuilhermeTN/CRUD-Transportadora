const mysqlConnection = require('./cadastroDB');

function cadastrarUsuario(usuario) {
    const { nome, email, senha } = usuario;
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;

    mysqlConnection.query(query, [nome, email, senha], (err, results) => {
        if (err) {
            console.error("Erro ao cadastrar usuário: ", err);
            return;
        }
        console.log("Usuário cadastrado com sucesso!");
        console.log("ID do usuário cadastrado:", results.insertId);
    });
}

module.exports = { cadastrarUsuario };