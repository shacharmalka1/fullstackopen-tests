const mongoose = require("mongoose");
const Blog = require("../model/Blogscheme");
const User = require("../model/UsersSchema");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);

const getValidToken = async () => {
  await api
    .post("/api/users")
    .send({ username: "admin", password: "test", name: "shacahr" });
  const res = await api
    .post("/api/login")
    .send({ username: "admin", password: "test" });
  return res.body.token;
};

test("should verify the length in DB as we expected", async () => {
  const token = await getValidToken();
  const result = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  expect(result.body.length).toBe(0);
});

test("verify that a blog added to DB", async () => {
  const token = await getValidToken();
  const blogs1 = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "test",
      author: "test",
      url: "test",
      likes: 0,
    })
    .expect(200);

  const blogs2 = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);

  expect(blogs1.body.length + 1).toBe(blogs2.body.length);
});

test("DB is defined and got property id", async () => {
  const token = await getValidToken();
  const result = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  expect(result.body[0].id).toBeDefined();
});

test("If the likes property is missing from the request, it will default to the value 0", async () => {
  const token = await getValidToken();
  const result = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Mystery egg1",
      author: "antonymous",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    });
  expect(result.body.likes).toBe(0);
});

test("If title and url properties are missing from the request data,the responds status code 400 Bad Request", async () => {
  const token = await getValidToken();
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send({
      author: "antonymous",
      likes: 5,
    })
    .expect(400);
});

test("verify that a chosen blog deleted from DB", async () => {
  const token = await getValidToken();
  const blogs1 = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  await api
    .delete(`/api/blogs/${blogs1.body[0].id}`)
    .set("Authorization", `Bearer ${token}`);

  const blogs2 = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);

  expect(blogs1.body.length - 1).toBe(blogs2.body.length);
});

test("should verify that a chosen blog updated in DB", async () => {
  const token = await getValidToken();
  const blogs1 = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  const firstBlog = blogs1.body[0];
  await api
    .put("/api/blogs/update")
    .set("Authorization", `Bearer ${token}`)
    .send({
      _id: firstBlog.id,
      likes: 821,
    })
    .expect(200);
  const blogs2 = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${token}`);
  const updatedBlog = blogs2.body[0];
  expect(updatedBlog.likes).toBe(821);
});

test("should return with the proper status code if a token is not provided", async () => {
  const res = await api
    .post("/api/blogs")
    .send({
      title: "test2",
      author: "test2",
      url: "test2",
      likes: 1,
    })
    .expect(401);
  expect(res.body.message).toBe("Unauthorized");
});

afterAll(async () => {
  await Blog.deleteMany();
  await User.findOneAndDelete({ username: "admin" });
  mongoose.connection.close();
});
