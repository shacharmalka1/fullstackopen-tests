import axios from "axios";
const baseUrl = "http://localhost:3003/api";

const getAllBlogs = async () => {
  //function get id and return allblogs
  const response = await axios.get(`${baseUrl}/blogs`, {
    headers: {
      authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const createUser = async (username, password, name) => {
  //function get user(username.pass,?name) and return properly message
  try {
    const response = await axios.post(`${baseUrl}/users`, {
      username,
      password,
      name,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const logUser = async (username, password) => {
  //function get user(username,pass) and return properly message
  try {
    const response = await axios.post(`${baseUrl}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data.error;
  }
};
const updateLikes = async (likes, _id) => {
  try {
    const response = await axios.put(
      `${baseUrl}/blogs/update`,
      {
        _id,
        likes,
      },
      {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data.error;
  }
};

const postBlog = async (title, author, url) => {
  try {
    const response = await axios.post(
      `${baseUrl}/blogs`,
      {
        title,
        author,
        url,
      },
      {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.message;
  } catch (err) {
    return err.response.data;
  }
};

const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/blogs/${id}`, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    return response.data.message;
  } catch (err) {
    return err.response.data;
  }
};

export { getAllBlogs, createUser, logUser, postBlog, updateLikes, deleteBlog };
