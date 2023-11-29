    const routerCreateAccont = require("./Create-AccountRouter");
    const routerLoginPage = require("./Login-PageRouter");
    const routerAdminPage = require("./Admin-pageRouter");
    const routerRegisterPage = require("./register-admin");
    const routerUsuariosPage = require("./UsuariosEditRouter");
    const routerDashboard = require("./Dashboard");
    const routerConfigUsuario = require("./usuarioConfigRouter");
    const routerConfigEnviarFretes = require("./enviarFretesRouter");

    module.exports = (app) => {
        app.use(routerCreateAccont);
        app.use(routerLoginPage);
        app.use(routerAdminPage);
        app.use(routerRegisterPage);
        app.use(routerUsuariosPage);
        app.use(routerDashboard);
        app.use(routerConfigUsuario);
        app.use(routerConfigEnviarFretes);
    }