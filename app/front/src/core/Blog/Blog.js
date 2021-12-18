import React, { useRef, useState, useEffect } from "react";
import { updateLikes, deleteBlog, getAllBlogs } from "../../services/blogs";

export default function Blog({
  blog,
  setRenderLikes,
  renderLikes,
  setBlogs,
  removeBlog,
}) {
  const likeRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useEffect(async () => {
    const blogs = await getAllBlogs();
    setBlogs(blogs.sort((a, b) => a.likes - b.likes).reverse());
  }, []);

  const addLike = async () => {
    console.log(likeRef.current.textContent.slice(8));
    await updateLikes(
      Number(likeRef.current.textContent.slice(8)) + 1,
      blog.id
    );
    setRenderLikes(renderLikes + 1);
  };

  return (
    <div className="card text-center" style={{ width: "18rem" }}>
      <div className="card-body blogs text-center">
        <button className="btn btn-success" onClick={toggleVisibility}>
          View
        </button>
        <div style={hideWhenVisible}>
          <h4 className="card-title">title - {blog.title}</h4>
        </div>
        <div style={showWhenVisible}>
          <h4 className="card-title">title - {blog.title}</h4>
          <h5 className="card-subtitle mb-2 text-muted">
            author - {blog.author}
          </h5>
          <h6 className="card-subtitle mb-3 ">url - {blog.url}</h6>
          <p className={`${blog.author}  card-text`} ref={likeRef}>
            likes : {blog.likes}
          </p>
          <button onClick={() => addLike()} className="btn btn-primary py-1">
            Like
          </button>
          &nbsp;
          <button onClick={toggleVisibility} className="btn btn-warning py-1">
            Hide
          </button>
          <br />
          <br />
          <button
            onClick={() => removeBlog(blog.id)}
            className="btn btn-danger py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
