const router = require("express").Router();
const {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");

router.get("/", getBlogs);

router.post("/", postBlog);

router.delete("/:id", deleteBlog);

router.put("/update", updateBlog);

module.exports = router;
