const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../model/UsersSchema");
const app = require("../index");
const api = supertest(app);

const users = [
  { name: "sahchar", username: "sahchcha" },
  { name: "sahchar", password: "21e3qwdqwd" },
  { name: "sahchar" },
  { name: "sahchar", password: "21e3qwdqwd", username: "ba" },
  { name: "sahchar", password: "21", username: "babaycry" },
];

test("should check that invalid users are not created and returns suitable status", async () => {
  await api.post("/api/users").send(users[0]).expect(403);
  await api.post("/api/users").send(users[1]).expect(403);
  await api.post("/api/users").send(users[2]).expect(403);
  await api.post("/api/users").send(users[3]).expect(400);
  await api.post("/api/users").send(users[4]).expect(401);
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
  // app.killServer()
});
