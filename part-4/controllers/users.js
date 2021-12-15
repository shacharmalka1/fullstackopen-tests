const bcrypt = require("bcryptjs");
const User = require("../model/UsersSchema");
const Blog = require("../model/Blogscheme");

exports.createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      name: name,
      password: passwordHash,
    });
    res.json(user);
  } catch (error) {
    res.status(409).send("user already exist");
  }
};

exports.getUser = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};
