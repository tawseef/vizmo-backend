const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require("../controller/user.controller");
const { validateSchema } = require("../middlewares/validate.middleware");
const {loginBodyValidaton, signUpBodyValidation} = require("../validation/auth.validator")

// Schema Validation for Login
const validateLogin = validateSchema(loginBodyValidaton);    

// Schema Validation for Signup
const validateSignup = validateSchema(signUpBodyValidation);    

// User Signup
router.post("/signup",validateSignup, handleUserSignup);

// User Login
router.post("/login", validateLogin, handleUserLogin);



module.exports = router