const jwt = require("jsonwebtoken");

exports.userValidate = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(403).send("username and password required!!!!");
  }
  if (username.length < 3) {
    return res.status(400).send("username must be at least 3 characters");
  }
  if (password.length < 3) {
    return res.status(401).send("password must be at least 3 characters");
  }
  next();
};

exports.userExtractor = (req, res, next) => {
  let authToken = req.headers.authorization;
  if (authToken === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  authToken = authToken.split(" ")[1];
  jwt.verify(authToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid Access Token");
    } else {
      req.user = decoded;
      next();
    }
  });
};
