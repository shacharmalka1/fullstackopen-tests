const Blog = require("../model/Blogscheme");

exports.postBlog = async (request, response) => {
  let likes = 0;
  if (request.body.likes) likes = request.body.likes;
  const blog = { likes, ...request.body };
  if (!request.body.title || !request.body.url) {
    response.status(400).send("should include title and url");
    return;
  }
  await Blog.insertMany(blog);
  response.send(blog);
};

exports.getBlogs = async (request, response) => {
  const res = await Blog.find({});
  response.json(res);
};

exports.deleteBlog = async (request, response) => {
  const id = request.params.id;
  const res = await Blog.deleteOne({ _id: id });
  response.json(res);
};

exports.deleteBlogs = async (request, response) => {
  await Blog.deleteMany();
  response.send("deleted");
};

exports.updateBlog = async (request, response) => {
  await Blog.findOneAndUpdate(
    { _id: request.body._id },
    { likes: request.body.likes }
  );
  response.send("updated");
};
