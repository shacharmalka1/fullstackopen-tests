const router = require("express").Router();
const {
  getBlogs,
  postBlog,
  deleteBlog,
  deleteBlogs,
  updateBlog,
} = require("../controllers/blogs");

router.get("/blogs", getBlogs);

router.post("/blogs", postBlog);

router.delete("/blogs/:id", deleteBlog);

router.delete("/blogsAll", deleteBlogs);

router.put("/update/blog", updateBlog);

module.exports = router;
