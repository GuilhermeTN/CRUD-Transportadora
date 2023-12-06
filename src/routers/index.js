const createAccountRouter = require("./Create-AccountRouter");
const loginPageRouter = require("./Login-PageRouter");
const adminPageRouter = require("./Admin-pageRouter");
const registerPageRouter = require("./register-admin");
const usuariosPageRouter = require("./UsuariosEditRouter");
const dashboardRouter = require("./Dashboard");
const configUsuarioRouter = require("./usuarioConfigRouter");
const configEnviarFretesRouter = require("./enviarFretesRouter");
const configVerificarFretesRouter = require("./verificarFretesRouter");
const removerUsuariosPageRouter = require("./RemoverUsuariosRouter");

module.exports = (app) => {
    app.use(createAccountRouter);
    app.use(loginPageRouter);
    app.use(adminPageRouter);
    app.use(registerPageRouter);
    app.use(usuariosPageRouter);
    app.use(removerUsuariosPageRouter);
    app.use(dashboardRouter);
    app.use(configUsuarioRouter);
    app.use(configEnviarFretesRouter);
    app.use(configVerificarFretesRouter);
};
