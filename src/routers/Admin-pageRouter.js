const { Router } = require("express");
const router = Router();
const path = require("path");


router.get("/Admin-page", (req, res)=>{
    const filepath = path.join(__dirname,"../pages/Admin-page.html");
    res.sendFile(filepath);
});



module.exports = router;