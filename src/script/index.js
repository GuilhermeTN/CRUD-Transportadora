const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = require("../routers/index");

app.use(express.static(path.join(__dirname, "../../")));

router(app);

app.listen(port, (error) => {
    if (error) {
        console.log("Deu Erro");
        return;
    }
    console.log("Subiu Certinho")
});