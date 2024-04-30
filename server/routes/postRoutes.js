const { Router } = require("express");

const {
  createPost,
  editPost,
  deletePost,
  getUserPost,
  getCatPosts,
  getPosts,
  getSinglePost,
  removeEventListener,
} = require("../controllers/postControllers");

const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.patch("/:id", authMiddleware, editPost);
router.get("/categories/:category", getCatPosts);
router.get("/users/:id", getUserPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
