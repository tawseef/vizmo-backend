const User = require("../model/user.model");
const httpStatus = require("http-status");

class UserService {
  // User registration in db
  register = async (user) => {
    try {
      const { fullName, email, username, password } = user;
      const newUser = await new userModel({ email, username, fullName, password });
      const result = await newUser.save();
      return result;
    } catch (error) {
      // throw error;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error, });
    }
  };

  // Find existing user in db
  findByUsername = async (username) => {
    try {
      const userResult = await User.findOne({name: username});
      return userResult;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
