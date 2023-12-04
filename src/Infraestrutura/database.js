const mysqlConnection = require('./cadastroDB');
const bcrypt = require('bcrypt');

const executeQuery = (query, values) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, values, (err, results) => {
            if (err) {
                console.error("Erro na consulta ao banco de dados:", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const cadastrarUsuario = async (usuario) => {
    console.log("Início da função cadastrarUsuario");

    const { nome, email, telefone, endereco, senha, isAdmin } = usuario;

    try {
        const hash = await bcrypt.hash(senha, 10);
        console.log("Hash gerado com sucesso:", hash);

        const query = `INSERT INTO usuarios (nome, email, senha, isAdmin, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [nome, email, hash, isAdmin, telefone, endereco];

        console.log("Query de inserção:", query);
        console.log("Valores:", values);

        const results = await executeQuery(query, values);

        console.log("Usuário cadastrado com sucesso!");
        console.log("ID do usuário cadastrado:", results.insertId);
    } catch (err) {
        console.error("Erro ao cadastrar usuário: ", err);
    }
};

const autenticarUsuario = async (email, senha) => {
    try {
        const query = 'SELECT id, nome, email, senha, isAdmin FROM usuarios WHERE email = ?';
        const results = await executeQuery(query, [email]);

        const usuarioDoBancoDeDados = results[0];

        if (!usuarioDoBancoDeDados || !usuarioDoBancoDeDados.senha) {
            console.error("Propriedade 'senha' não encontrada ou é undefined no usuário.");
            throw new Error("Credenciais inválidas");
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioDoBancoDeDados.senha);

        return {
            id: usuarioDoBancoDeDados.id,
            nome: usuarioDoBancoDeDados.nome,
            email: usuarioDoBancoDeDados.email,
            isAdmin: usuarioDoBancoDeDados.isAdmin,
            senhaCorreta,
        };
    } catch (err) {
        console.error("Erro ao autenticar usuário: ", err);
        throw err;
    }
};

const autenticarUsuarioPorId = async (id) => {
    try {
        const query = 'SELECT id, nome, email, isAdmin FROM usuarios WHERE id = ?';
        const results = await executeQuery(query, [id]);

        const usuarioDoBancoDeDados = results[0];

        if (!usuarioDoBancoDeDados) {
            console.error("Usuário não encontrado no banco de dados.");
            throw new Error("Usuário não encontrado");
        }

        return {
            id: usuarioDoBancoDeDados.id,
            nome: usuarioDoBancoDeDados.nome,
            email: usuarioDoBancoDeDados.email,
            isAdmin: usuarioDoBancoDeDados.isAdmin,
        };
    } catch (err) {
        console.error("Erro ao autenticar usuário por ID: ", err);
        throw err;
    }
};

const atualizarUsuario = async ({ nome, telefone, endereco, senha, id }) => {
    const query = "UPDATE usuarios SET nome=?, telefone=?, endereco=?, senha=? WHERE id=?";
    const values = [nome, telefone, endereco, senha, id];

    try {
        await executeQuery(query, values);
        console.log("Dados do usuário atualizados com sucesso!");
    } catch (err) {
        console.error("Erro ao atualizar dados do usuário: ", err);
    }
};

const inserirFrete = async ({ idUsuario, localEntrega, valorFrete, tamanhoPacote }) => {
    try {
        const queryObterEndereco = 'SELECT endereco FROM usuarios WHERE id = ?';
        const resultsEndereco = await executeQuery(queryObterEndereco, [idUsuario]);
        const enderecoUsuario = resultsEndereco[0] ? resultsEndereco[0].endereco : 'Seu Endereço padrão';

        const queryInserirFrete = 'INSERT INTO fretes (id_usuario, local_entrega, local_saida, valor_frete, tamanho_pacote) VALUES (?, ?, ?, ?, ?)';
        const valuesInserirFrete = [idUsuario, localEntrega, enderecoUsuario, valorFrete, tamanhoPacote];

        await executeQuery(queryInserirFrete, valuesInserirFrete);
        console.log('Frete inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir frete no banco de dados:', err);
    }
};

module.exports = { cadastrarUsuario, autenticarUsuario, autenticarUsuarioPorId, atualizarUsuario, inserirFrete };
