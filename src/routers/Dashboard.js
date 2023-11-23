const { Router } = require("express");
const router = Router();
const path = require("path");


router.get("/Dashboard", (req, res)=>{
    const filepath = path.join(__dirname,"../pages/usuario-Dashboard.html");
    res.sendFile(filepath);
});

module.exports = router;