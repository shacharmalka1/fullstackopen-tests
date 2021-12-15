const jwt = require("jsonwebtoken");

exports.userValidate = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(403).send("username and password required!!!!");
    return;
  }
  if (username.length < 3) {
    res.status(400).send("username must be at least 3 characters");
    return;
  }
  if (password.length < 3) {
    res.status(401).send("password must be at least 3 characters");
    return;
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
