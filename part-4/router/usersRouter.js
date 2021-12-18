const router = require("express").Router();
const { createUser, getUsers } = require("../controllers/users");
const { userValidate } = require("../middleware/errorHandler");

router.post("/", userValidate, createUser);

router.get("/", getUsers);

module.exports = router;
