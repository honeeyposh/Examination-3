const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getSinglePost,
} = require("../controllers/postController");
const authentication = require("../middlewares/authMiddleware");
const route = express.Router();
route.post("/post", authentication, createPost);
route.get("/post", getPosts);
route.get("/post/:postId", getSinglePost);
route.delete("/post/:postId", authentication, deletePost);
route.put("/post/:postId/:userId", updatePost);
module.exports = route;
