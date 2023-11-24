const mysqlConnection = require('./cadastroDB');
const bcrypt = require('bcrypt');   


function cadastrarUsuario(usuario) {
    console.log("Início da função cadastrarUsuario");
    const { nome, email, telefone, endereco, senha, isAdmin } = usuario;

    try {
        console.log("Antes de criar hash de senha");
        const hash = bcrypt.hashSync(senha, 10);
        console.log("Depois de criar hash de senha");

        const query = `INSERT INTO usuarios (nome, email, senha, isAdmin, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [nome, email, hash, isAdmin, telefone, endereco];

        console.log("Query de inserção:", query);
        console.log("Valores:", values);

        mysqlConnection.query(query, values, (err, results) => {
            if (err) {
                console.error("Erro ao cadastrar usuário: ", err);
                return;
            }

            console.log("Usuário cadastrado com sucesso!");
            console.log("ID do usuário cadastrado:", results.insertId);
        });
    } catch (error) {
        console.error("Erro no bloco try:", error);
    }
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

function autenticarUsuarioPorId(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, nome, email, isAdmin FROM usuarios WHERE id = ?';

        mysqlConnection.query(query, [id], (err, results) => {
            if (err) {
                console.error("Erro ao buscar usuário por ID no banco de dados:", err);
                return reject(err);
            }

            const usuarioDoBancoDeDados = results[0];

            if (!usuarioDoBancoDeDados) {
                console.error("Usuário não encontrado no banco de dados.");
                return reject(new Error("Usuário não encontrado"));
            }

            resolve({
                id: usuarioDoBancoDeDados.id,
                nome: usuarioDoBancoDeDados.nome,
                email: usuarioDoBancoDeDados.email,
                isAdmin: usuarioDoBancoDeDados.isAdmin,
            });
        });
    });
}

const atualizarUsuario = ({ nome, telefone, endereco, senha, id }) => {
    const query = "UPDATE usuarios SET nome=?, telefone=?, endereco=?, senha=? WHERE id=?";
    const values = [nome, telefone, endereco, senha, id];

    // Execute a query no banco de dados
    mysqlConnection.query(query, values, (err, results) => {
        if (err) {
            console.error("Erro ao atualizar dados do usuário no banco de dados: ", err);
            // Trate o erro de forma adequada (envie uma resposta HTTP ou faça o redirecionamento)
        } else {
            console.log("Dados do usuário atualizados com sucesso!");
            // Trate o sucesso de forma adequada (envie uma resposta HTTP ou faça o redirecionamento)
        }
    });
};
module.exports = { cadastrarUsuario, autenticarUsuario, autenticarUsuarioPorId, atualizarUsuario };