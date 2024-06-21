const httpStatus = require("http-status");
const BlogService = require("../service/blog.service");
const BlogServiceInstance = new BlogService();

const checkAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author } = req.body;
    const blogDetails = await BlogServiceInstance.findWithId(id);
    if (blogDetails) {
      if (blogDetails.author === author) {
        next();
      } else {
        res.status(httpStatus.FORBIDDEN).json({
          message: "Blog does not belong to the provided author",
        });
      }
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Blog not found with the provided id.", id });
    }
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({
      message: "Could not verify provided author",
      id: req.params.id,
    });
  }
};

const checkBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogResponse = await BlogServiceInstance.findWithId(id);
    if (blogResponse) {
      next();
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Blog not found", blogId: id });
    }
  } catch (error) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Invalid Blog id", id: req.params.id });
  }
};

module.exports = { checkAuthor, checkBlog };
