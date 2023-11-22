const mysqlConnection = require('./cadastroDB');
const bcrypt = require('bcrypt');   

function cadastrarUsuario(usuario) {
    const { nome, email, senha, isAdmin } = usuario;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error("Erro ao criar hash de senha: ", err);
            return;
        }

        const query = `INSERT INTO usuarios (nome, email, senha, isAdmin) VALUES (?, ?, ?, ?)`;
        const values = [nome, email, hash, isAdmin];

        mysqlConnection.query(query, values, (err, results) => {
            if (err) {
                console.error("Erro ao cadastrar usuário: ", err);
                return;
            }
            console.log("Usuário cadastrado com sucesso!");
            console.log("ID do usuário cadastrado:", results.insertId);
        });
    });
}

function autenticarUsuario(email, senha) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, nome, email, senha, isAdmin FROM usuarios WHERE email = ?';

        mysqlConnection.query(query, [email], (err, results) => {
            if (err) {
                console.error("Erro ao buscar usuário no banco de dados:", err);
                return reject(err);
            }

            const usuarioDoBancoDeDados = results[0];

            if (!usuarioDoBancoDeDados || !usuarioDoBancoDeDados.senha) {
                console.error("Propriedade 'senha' não encontrada ou é undefined no usuário.");
                return reject(new Error("Credenciais inválidas"));
            }

            bcrypt.compare(senha, usuarioDoBancoDeDados.senha, (compareErr, senhaCorreta) => {
                if (compareErr) {
                    console.error("Erro ao comparar senhas:", compareErr);
                    return reject(compareErr);
                }

                resolve({
                    id: usuarioDoBancoDeDados.id,
                    nome: usuarioDoBancoDeDados.nome,
                    email: usuarioDoBancoDeDados.email,
                    isAdmin: usuarioDoBancoDeDados.isAdmin,
                    senhaCorreta,
                });
            });
        });
    });
}

module.exports = { cadastrarUsuario, autenticarUsuario };