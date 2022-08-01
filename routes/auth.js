const express=require("express");
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/auth");

const router=express.Router();



router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/forgetPass").post(forgotPassword)


router.route("/resetPass/:resetToken").put(resetPassword)

module.exports=router;

