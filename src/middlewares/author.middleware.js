const httpStatus = require("http-status");
const UserService = require("../service/user.service");
const UserServiceInstance = new UserService();

const fetchAuthorUser = async (req, res, next) => {
  try {
    const { author } = req.body;
    const user = await UserServiceInstance.findByUsername(author);
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Author not found!", authorName: author });
    else {
      next();
    }
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ message: "Could not find user" });
  }
};

module.exports = { fetchAuthorUser };
