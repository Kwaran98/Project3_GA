const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

// ================ CREATE A POST ==================== //
// POST : api/posts
// PROTECTED
const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Fill in all fields and choose thumbnail. ", 422)
      );
    }

    const { thumbnail } = req.files;
    // check the file size
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnal too big. File should be less than 2mb.")
      );
    }
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "..", "/uploads", newFilename),
      async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post couldn't be created.", 422));
          }
          //find user and increase post count by 1
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================ GET ALL POST ======================= //
// POST : api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================ GET SINGLE POST ===================== //
// GET : api/posts/:id
// UNPROTECTED
const getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post is not found.", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================ GET POSTS BY CATEGORY ===================== //
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================ GET AUTHOR POST  ===================== //
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ creator: id }).sort({ createAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================= EDIT POST ============================//
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, category, description } = req.body;

    // Check if required fields are provided
    if (!title || !category || !description) {
      return next(new HttpError("Please fill in all fields.", 422));
    }

    let updatedPost;
    //get oldPOst from database

    // Check if thumbnail is included in the request files
    if (!req.files || !req.files.thumbnail) {
      // If thumbnail is not included, update post without changing thumbnail
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, category, description },
        { new: true }
      );
    } else {
      // Thumbnail is included, process it
      const { thumbnail } = req.files;

      // Check file size
      if (thumbnail.size > 2000000) {
        return next(new HttpError("Thumbnail should be less than 2MB.", 422));
      }

      // Generate a new filename for the thumbnail
      const newFilename = `${uuid()}.${thumbnail.name.split(".").pop()}`;

      // Move the uploaded thumbnail to the uploads directory
      await thumbnail.mv(path.join(__dirname, "..", "uploads", newFilename));

      // Find the old post to delete its thumbnail
      const oldPost = await Post.findById(postId);
      if (!oldPost) {
        return next(new HttpError("Post not found.", 404));
      }
      if (req.user.id == oldPost.creator) {
        // Delete the old thumbnail file
        fs.unlinkSync(path.join(__dirname, "..", "uploads", oldPost.thumbnail));

        // Update post with new data including the new thumbnail filename
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFilename },
          { new: true }
        );
      }
    }
    // Check if post was successfully updated
    if (!updatedPost) {
      return next(new HttpError("Could not update post.", 400));
    }

    // Send success response with updated post
    res.status(200).json(updatedPost);
  } catch (error) {
    // Handle errors
    return next(new HttpError(error.message, 500));
  }
};

// ================== DELETE POST ======================//
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post unavailable.", 400));
    }
    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;
    if (req.user.id == post.creator) {
      // delete thumbnail from uploads folder
      fs.unlink(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          } else {
            await Post.findByIdAndDelete(postId);
            // find user and reduce post count by 1
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
            res.json(`Post ${postId} deleted successfully.`);
          }
        }
      );
    } else {
      return next(new HttpError("Post could not be deleted", 403));
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getUserPost,
  getCatPosts,
  getPosts,
  getSinglePost,
};
