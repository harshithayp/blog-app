const express = require("express");
const router = express.Router();
const { signupuser, signinuser , getsignup, getsignin, logout } = require("../controllers/authuserController");

router.post("/signin",signinuser);
router.get("/signin",getsignin);
router.post("/signup", signupuser);
router.get("/signup",getsignup);
router.get("/logout",logout);



module.exports = router;