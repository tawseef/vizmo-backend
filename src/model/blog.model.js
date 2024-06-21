const mongoose = require("mongoose");

// Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, maxlength: 150, required: true },
    content: { type: String, default: "" },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
