import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../services/blogs";
import Blog from "./Blog/Blog";
import CreateBlog from "./CreateBlog";

export default function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.username;
  const [blogs, setBlogs] = useState([]);
  const [renderLikes, setRenderLikes] = useState(0);
  const [renderBlogs, setRenderBlogs] = useState(0);

  const removeBlog = async (id) => {
    if (!window.confirm("are you sure you want to delete this blog")) return;

    setRenderBlogs(renderBlogs + 1);
    const res = await deleteBlog(id);
    // if(!res.message)
    // window.confirm(res)
    // else
    // window.confirm(res.message);
  };

  useEffect(async () => {
    const newBlogs = await getAllBlogs();
    setBlogs(newBlogs.sort((a, b) => a.likes - b.likes).reverse());
  }, [renderLikes, renderBlogs]);

  const logOut = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="text-center" style={{ textAlign: "center" }}>
      <h3 style={{ color: "green" }}>hello {user}</h3>
      <button className="btn btn-danger" onClick={() => logOut()}>
        logout
      </button>
      <br />
      <br />
      <CreateBlog
        renderBlogs={renderBlogs}
        setRenderBlogs={setRenderBlogs}
        className="text-center"
      />
      <h2 style={{ textAlign: "left" }}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        blogs
      </h2>
      {blogs.map((blog) => (
        <Blog
          removeBlog={removeBlog}
          renderLikes={renderLikes}
          setRenderLikes={setRenderLikes}
          setBlogs={setBlogs}
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
}
