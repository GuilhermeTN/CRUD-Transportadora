const routerCreateAccont = require("./Create-AccountRouter");
const routerLoginPage = require("./Login-Page");
const routerAdminPage = require("./Admin-pageRouter");
module.exports = (app) => {
    app.use(routerCreateAccont);
    app.use(routerLoginPage);
    app.use(routerAdminPage);
}