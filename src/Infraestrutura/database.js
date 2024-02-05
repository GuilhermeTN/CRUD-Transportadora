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

    const { nome, email, telefone, endereco, senha, isAdmin, token } = usuario;

    try {
        const hash = await bcrypt.hash(senha, 10);
        console.log("Hash gerado com sucesso:", hash);

        const query = `INSERT INTO usuarios (nome, email, senha, isAdmin, telefone, endereco, token) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [nome, email, hash, isAdmin, telefone, endereco, token];

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

const obterFretesPorUsuario = async (idUsuario) => {
    try {
        const query = 'SELECT local_entrega, local_saida, valor_frete, tamanho_pacote FROM fretes WHERE id_usuario = ?';
        const results = await executeQuery(query, [idUsuario]);
        return results;
    } catch (err) {
        console.error('Erro ao obter fretes do banco de dados:', err);
        throw err;
    }
};

const obterTodosUsuarios = async () => {
    try {
      const query = `
        SELECT
          u.id,
          u.nome,
          u.email,
          u.telefone,
          IFNULL(f.local_entrega, 'N/A') AS local_entrega,
          IFNULL(f.valor_frete, 'N/A') AS valor_frete
        FROM usuarios u
        LEFT JOIN fretes f ON u.id = f.id_usuario;`;
  
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error('Erro ao obter todos os usuários:', error);
      throw error;
    }
  };


const removerUsuario = async (userId) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    const values = [userId];
  
    try {
      await executeQuery(query, values);
      console.log('Usuário removido com sucesso!');
    } catch (err) {
      console.error('Erro ao remover usuário do banco de dados:', err);
      throw err;
    }
  };


module.exports = { cadastrarUsuario, autenticarUsuario, autenticarUsuarioPorId, atualizarUsuario, inserirFrete, obterFretesPorUsuario, obterTodosUsuarios, removerUsuario};
