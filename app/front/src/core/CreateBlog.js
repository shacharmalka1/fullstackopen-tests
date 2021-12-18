import React, { useState, useRef } from "react";
import { postBlog } from "../services/blogs";

export default function CreateBlog({ setRenderBlogs, renderBlogs }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const urlRef = useRef(null);
  const cancelRef = useRef(null);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const CreateBlog = async () => {
    setRenderBlogs(renderBlogs + 1);
    const res = await postBlog(
      titleRef.current.value,
      authorRef.current.value,
      urlRef.current.value
    );
    titleRef.current.value = "";
    authorRef.current.value = "";
    urlRef.current.value = "";
    console.log(res);
    alert(res);
    cancelRef.current.click();
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="btn btn-success" onClick={toggleVisibility}>
          <b>Create new blog</b>
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          <br />
          <br />
          title&nbsp;&nbsp;&nbsp;
          <input id="title" ref={titleRef} placeholder="type title" />
          <br />
          <br />
          author&nbsp;
          <input id="author" ref={authorRef} placeholder="type author" />
          <br />
          <br />
          url&nbsp;&nbsp;&nbsp;
          <input id="url" ref={urlRef} placeholder="type url" />
          <br />
          <br />
          <button className="btn btn-primary" onClick={() => CreateBlog()}>
            Create New Blog
          </button>
          <br />
          <br />
        </div>
        <button
          className="btn btn-danger"
          ref={cancelRef}
          onClick={toggleVisibility}
        >
          <b>Cancel</b>
        </button>
      </div>
    </div>
  );
}
