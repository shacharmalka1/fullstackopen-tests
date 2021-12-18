const bcrypt = require("bcryptjs");
const User = require("../model/UsersSchema");

exports.createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      name: name,
      password: passwordHash,
      blogs: [],
    });
    res.json(user);
  } catch (error) {
    res.status(409).send("user already exist");
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
