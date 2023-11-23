const { Router } = require("express");
const router = Router();
const path = require("path");


router.get("/Create-Account", (req, res)=>{
    const filepath = path.join(__dirname,"../pages/Create-Account.html");
    res.sendFile(filepath);
});


module.exports = router;
