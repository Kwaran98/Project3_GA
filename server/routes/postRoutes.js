const { Router } = require("express");
const router = Router();
const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../utils/multer");

const {
  createPost,
  editPost,
  deletePost,
  getUserPost,
  getCatPosts,
  getPosts,
  getSinglePost,
} = require("../controllers/postControllers");

router.post("/",upload.single('thumbnail'), authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.patch("/:id",upload.single('thumbnail'), authMiddleware, editPost);
router.get("/categories/:category", getCatPosts);
router.get("/users/:id", getUserPost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
