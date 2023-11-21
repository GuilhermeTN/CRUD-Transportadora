const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'GuilhermeTN',
    password: 'GuiTN83.',
    database: 'cadastro_db'
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados: ", err);
        return;
    }
    console.log("Conexão com o banco de dados estabelecida");
});

module.exports = connection;