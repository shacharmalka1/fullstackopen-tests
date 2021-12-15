const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./router/blogsRouter");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
require("dotenv").config();
const { userExtractor } = require("./middleware/errorHandler");
app.use(cors());
app.use(express.json());

app.use("/api/blogs", userExtractor, blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch(() => {
    console.log("connection to database failed");
  });

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
