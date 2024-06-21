const Blogs = require("../model/blog.model");

class BlogService {
  // Find blog using the provided Id 
  findWithId = async (id) => {
    try {
      const result = await Blogs.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  // Find blog using the provided Title 
  findWithTitle = async (title) => {
    try {
      const result = await Blogs.find({ title: title });
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  // Find blog using the provided Author 
  findWithAuthor = async (author) => {
    try {
      const result = await Blogs.find({ author: author });
      return result;
    } catch (error) {
      throw error;
    }
  };

  // Find all the blogs in db
  findAll = async () => {
    try {
        const blogResult = await Blogs.find();
        return blogResult;
    } catch (error) {
        throw error;
    }
  }

  findOnly = async (data) => {
      const {title, author} = data
    try {
        const blogResult = await Blogs.find({title: title, author: author});
        return blogResult;
    } catch (error) {
        throw error;
    }
  }

  // Create new blog
  create = async (data) => {
    try {
        const { author, title, content} = data; 
        const result = await Blogs.create({ author, title, content});
        return result;
    } catch (error) {
        throw error;
    }
  };

  // Modify the blog's content
  addContent = async (newContent, blogId) => {
    try {
      const { author,content } = newContent;
      const result = await Blogs.findOneAndUpdate(
        { _id: blogId, author: author },
        { content: content },
        { new: true }
      )
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Deleting the blog with provided Id
  delete = async (blogId) => {
    try {
      const result = await Blogs.findOneAndDelete({ _id: blogId });
      return result;
    } catch (error){
      throw error;
    }
  };

}

module.exports = BlogService;
