const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/UsersSchema");

exports.login = async (request, response) => {
  const body = request.body;

  const user = await User.findOne({ username: body.username });
  console.log(body);
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token });
};
