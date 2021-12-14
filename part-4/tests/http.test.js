const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");

const api = supertest(app);

test("notes are returned as json", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(result.body.length).toBe(1);
});

test("verify that a blog added to DB", async () => {
  const result1 = await api.get("/api/blogs");
  await api
    .post("/api/blogs")
    .send({
      title: "test",
      author: "test",
      url: "test",
      likes: 5,
    })
    .expect(200);

  const result2 = await api.get("/api/blogs");

  expect(result1.body.length + 1).toBe(result2.body.length);
});

test("DB is defined and got property id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("verifies that a new blog without liked gets likes prop", async () => {
  const blogs1 = await api.post("/api/blogs").send({
    title: "test",
    author: "test",
    url: "test",
  });
  expect(blogs1.body.likes).toBe(0);
});

test("verifies that a blog without title or url returns status 400", async () => {
  const blogs1 = await api
    .post("/api/blogs")
    .send({
      author: "test",
      likes: 0,
    })
    .expect(400);
});

test("verify that a chosen blog deleted from DB", async () => {
  const blogs1 = await api.get("/api/blogs");

  await api.delete(`/api/blogs/${blogs1.body[0].id}`);

  const blogs2 = await api.get("/api/blogs");

  expect(blogs1.body.length - 1).toBe(blogs2.body.length);
});

test("should verify that a chosen blog updated in DB", async () => {
  const blogs1 = await api.get("/api/blogs");
  const firstBlog = blogs1.body[0];
  //   console.log(blogs.body[0].id);
  await api
    .put("/api/update/blog")
    .send({
      _id: firstBlog.id,
      likes: 821,
    })
    .expect(200);
  const blogs2 = await api.get("/api/blogs");
  const updatedBlog = blogs2.body[0];
  expect(updatedBlog.likes).toBe(821);
});

// test("update likes ", async () => {
//   const blogs2 = await api.get("/api/blogs");

//   const blogs1 = await api.put("/api/update/blog").send({
//     _id: blogs2.body[0].id,
//     likes: 800,
//   });

//   const blogs3 = await api.get("/api/blogs");
//   expect(blogs3.body[0].likes).toBe(blogs1.body[0].likes);
// });

afterAll(async () => {
  await api.delete("/api/blogsAll");
  await api.post("/api/blogs").send({
    title: "shachar",
    author: "queen",
    url: "test",
    likes: 100,
  });

  mongoose.connection.close();
});
