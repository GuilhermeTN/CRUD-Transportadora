const { Router } = require("express");
const router = Router();
const path = require("path");


router.get("/Login-Page", (req, res)=>{
    const filepath = path.join(__dirname,"../pages/Login-page.html");
    res.sendFile(filepath);
});


module.exports = router;