const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  for (const blog of blogs) {
    likes += blog.likes;
  }
  return likes;
};

const favoriteBlog = (blogs) => {
  let max = 0;
  let blogMax = {};
  for (const blog of blogs) {
    if (blog.likes > max) {
      max = blog.likes;
      blogMax = { title: blog.title, author: blog.author, likes: blog.likes };
      console.log(blogMax);
    }
  }
  return blogMax;
};

const authorArray = (blogs) => {
  let authors = [];
  for (const blog of blogs) {
    authors.push(blog.author);
  }
  return authors;
};

const mostBlogs = (blogs) => {
  let authors = authorArray(blogs);
  let mostBlogsArray = [];
  let count = 0;
  for (const author of authors) {
    //shachar,sagi,shachar,guy
    for (let i = 0; i <= authors.length; i++) {
      if (authors[i] === author) count++;
    }
    mostBlogsArray.push({ author: author, blogs: count });
    count = 0;
    // authors = authors.filter((name) => name !== author);
  }
  let uniqIds = {};
  mostBlogsArray = mostBlogsArray.filter(
    (obj) => !uniqIds[obj.author] && (uniqIds[obj.author] = true)
  );

  let max = 0;
  let authorMaxBlogs = {};
  for (const author of mostBlogsArray) {
    if (author.blogs > max) {
      max = author.blogs;
      authorMaxBlogs = { author: author.author, blogs: author.blogs };
    }
  }

  return authorMaxBlogs;
};

const mostLikes = (blogs) => {
  let likes = 0;
  let mostLikessArray = [];
  for (const blog of blogs) {
    //shachar,sagi,shachar,guy
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].author === blog.author) {
        likes += blog.likes;
      }
    }
    mostLikessArray.push({ author: blog.author, likes: blog.likes });
    likes = 0;
  }

  let likesOfAuthor = [];
  let like = 0;
  for (let i = 0; i < mostLikessArray.length; i++) {
    for (let k = 0; k < mostLikessArray.length; k++) {
      if (mostLikessArray[i].author === mostLikessArray[k].author)
        like += mostLikessArray[k].likes;
    }
    likesOfAuthor.push({ author: mostLikessArray[i].author, likes: like });
    like = 0;
  }

  let uniqIds = {};
  likesOfAuthor = likesOfAuthor.filter(
    (obj) => !uniqIds[obj.author] && (uniqIds[obj.author] = true)
  );

  let max = 0;
  let authorMaxLikes = {};
  for (const author of likesOfAuthor) {
    if (author.likes > max) {
      max = author.likes;
      authorMaxLikes = { author: author.author, likes: author.likes };
    }
  }

  return authorMaxLikes;
};

console.log(
  mostLikes([
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "shachar",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "shachar queen",
      author: "shachar",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 100,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f5",
      title: "Go To Statement Considered Harmful",
      author: "shachar",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676244d17f5",
      title: "Go To Statement Considered Harmful",
      author: "sagi",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ])
);

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
