const routerCreateAccont = require("./Create-AccountRouter");
const routerLoginPage = require("./Login-PageRouter");
const routerAdminPage = require("./Admin-pageRouter");
const routerRegisterPage = require("./register-admin");
const routerUsuariosPage = require("./UsuariosEditRouter");
module.exports = (app) => {
    app.use(routerCreateAccont);
    app.use(routerLoginPage);
    app.use(routerAdminPage);
    app.use(routerRegisterPage);
    app.use(routerUsuariosPage);
}