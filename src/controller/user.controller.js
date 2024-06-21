const httpStatus = require("http-status");
const AuthService = require("../service/userAuth.service");
const AuthServiceInstance = new AuthService();

// Signup Function
async function handleUserSignup(req, res) {
  try {
    const user = await AuthServiceInstance.signup(req.body);
    res
      .status(httpStatus.OK)
      .json({ message: "Signup Successful", username: user.name });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error", error });
  }
}

// Login Function
async function handleUserLogin(req, res) {
  try {
    const result = await AuthServiceInstance.login(req.body);
    // Storing token to cookie
    res.cookie("token", result.token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(result);
  } catch (error) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "User does not exist", error });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
