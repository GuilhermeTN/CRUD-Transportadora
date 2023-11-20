const routerCreateAccont = require("./Create-AccountRouter");
const routerLoginPage = require("./Login-Page")
module.exports = (app) => {
    app.use(routerCreateAccont);
    app.use(routerLoginPage);
}