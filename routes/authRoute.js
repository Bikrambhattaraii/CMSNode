const { renderRegisterform, registerUser, loginUser,renderLoginForm} = require("../controller/auth/authController");


const router =require("express").Router();



router.route('/register').get(renderRegisterform).post(registerUser)  // if user send get request to regoster  register user dekhaune
router.route('/login').get(renderLoginForm).post(loginUser)


module.exports =router;