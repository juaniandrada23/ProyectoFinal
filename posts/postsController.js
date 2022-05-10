const { addNewPost, getPostsWith, getAllPosts } = require("./postsModel");

const listAll = async (req, res, next) => {
  let dbResponse = null;
  if (req.query.title) { //http://localhost:3030/posts?title=JavaScript este endpoint indica: req.query.title = JavaScript
    dbResponse = await getPostsWith(req.query.title);
  } else {
    dbResponse = await getAllPosts();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

const addOne = async (req, res, next) => {
  const dbResponse = await addNewPost({ userid: req.token.id, ...req.body });
  dbResponse instanceof Error
    ? next(dbResponse)
    : res.status(201).json({ message: `Post created by ${req.token.name}` });
};

module.exports = { listAll, addOne };