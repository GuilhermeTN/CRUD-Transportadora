const { Router } = require("express");
const router = Router();
const path = require("path");


router.get("/Usuarios", (req, res)=>{
    const filepath = path.join(__dirname,"../pages/Usuarios.html");
    res.sendFile(filepath);
});

module.exports = router;