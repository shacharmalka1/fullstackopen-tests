const Blog = require("../model/Blogscheme");
const User = require("../model/UsersSchema");

exports.postBlog = async (request, response) => {
  let likes = 0;
  const user = request.user;
  if (request.body.likes) likes = request.body.likes;
  let blog = { likes, ...request.body };
  blog = { user, ...blog };
  if (!request.body.title || !request.body.url) {
    response.status(400).send("should include title and url");
    return;
  }
  const newBlog = await Blog.create(blog);
  await User.findOneAndUpdate(
    { _id: user.id },
    { $push: { blogs: { _id: newBlog.id, ...blog } } }
  );
  response.json({
    blog,
    message: `blog posted - "${blog.title}" by ${user.username}!`,
  });
};

exports.getBlogs = async (request, response) => {
  const res = await Blog.find({});
  response.json(res);
};

exports.updateBlog = async (request, response) => {
  const { likes, _id } = request.body;
  await Blog.findOneAndUpdate({ _id }, { likes });
  response.send("updated successfully");
};

exports.deleteBlog = async (request, response) => {
  try {
    const id = request.params.id;
    await Blog.deleteOne({ _id: id });
    response.send("deleted successfully");
  } catch (error) {
    return response.status(422).send("wrong id, this blog does'nt exist");
  }
};
