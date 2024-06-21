const httpStatus = require("http-status");
const BlogService = require("../service/blog.service");
const BlogServiceInstance = new BlogService();

class BlogController {
  // Get all the blog in the db
  getAllBlogs = async (req, res) => {
    try {
      const blogsResult = await BlogServiceInstance.findAll();
      if (blogsResult.length) {
        res.json(blogsResult);
      } else {
        res.status(httpStatus.NOT_FOUND).json({ message: "No Blogs found" });
      }
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching blogs", error });
    }
  };

  // Find the blog with a provided Id
  findBlogsById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await BlogServiceInstance.findWithId(id);
      if (result) {
        res.json(result);
      } else {
        res
          .status(httpStatus.NOT_FOUND)
          .json({ message: `Blog with id ${id} not found` });
      }
    } catch (error) {
      res
        .status(httpStatus.BAD_GATEWAY)
        .json({ message: "Could not fetch this blog", id });
    }
  };

  // Creates a new blog in the db
  createNewBlog = async (req, res) => {
    try {
      const result = await BlogServiceInstance.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({
        message: "Failed to create new blog",
        title: req.body.title,
        error,
      });
    }
  };

  // Delete a the blog in the db
  deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await BlogServiceInstance.delete(id);
      res.status(httpStatus.ACCEPTED).json({
        message: "Delete successful",
        blog_id: id,
      });
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({
        message: "Failed to delete this blog",
        blog_id: id,
      });
    }
  };

  // Update content in the blog
  updateContentInBlog = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await BlogServiceInstance.addContent(req.body, id);
      if(!result){
        res.status(httpStatus.UNAUTHORIZED).json({
          message: "Updation unsuccessful, check Id and author"
        });
      }else{
        res.status(httpStatus.OK).json({
          message: "Successfully updated the content in the blog",
          blog_id: id,
        })
      }
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({
        message: "Failed to update content in the blog",
        blog_id: id,
        error,
      });
    }
  };

  // Find all blogs in the db with a given title or author or both
  // Title or Author or both of them required as params
  findBlogsByFilter = async (req, res) => {
    try {
      const { title, author } = req.query;
      if (title && !author) {
        const result = await BlogServiceInstance.findWithTitle(title);
        if (result.length) {
          res.json(result);
        } else {
          res
            .status(httpStatus.NOT_FOUND)
            .json({ message: `Blog with title ${title} not found` });
        }
      } else if (!title && author) {
        const result = await BlogServiceInstance.findWithAuthor(author);
        if (result) {
          res.json(result);
        } else {
          res
            .status(httpStatus.NOT_FOUND)
            .json({ message: `Any blog with author name ${author} not found` });
        }
      } else {
        const result = await BlogServiceInstance.findOnly({ title, author });
        if (result.length) {
          res.json(result);
        } else {
          res.status(httpStatus.NOT_FOUND).json({
            message: `Blog with title ${title} and author ${author} not found`,
          });
        }
      }
    } catch (error) {
      res
        .status(httpStatus.BAD_GATEWAY)
        .json({ message: "Could not fetch blog" });
    }
  };
}

module.exports = BlogController;
