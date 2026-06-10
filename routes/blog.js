const { Router } = require("express");
const router = Router();
const path = require("path");
const multer = require("multer");

const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const upload = require("../service/multerConfig")




router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});


router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy");

    if (!blog) {
      return res.status(404).render("404", {
        error: "Blog not found",
      });
    }

    const comments = await Comment.find({
      blogId: req.params.id,
    }).populate("createdBy");

    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).render("404", {
      error: "Unable to load blog",
    });
  }
});



router.post(
  "/",
  upload.single("bodyImageURL"),
  async (req, res) => {

    try {

       console.log(" CREATE BLOG HIT");

  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  console.log("USER:", req.user);

      const { title, body } = req.body;

      if (!title || !body) {
        return res.render("addBlog", {
          user: req.user,
          error: "Title and content are required",
        });
      }

 const blogData = {
      title,
        body,
        createdBy: req.user._id,
};

if (req.file) {
   blogData.bodyImageURL = `/uploads/${req.file.filename}`;
}

      await Blog.create(blogData)
      return res.redirect("/");

    } catch (err) {

      console.error(err);

      if (err instanceof multer.MulterError) {
        return res.render("addBlog", {
          user: req.user,
          error: "Image size is too large",
        });
      }

      if (err.name === "ValidationError") {

        const firstError =
          Object.values(err.errors)[0].message;

        return res.render("addBlog", {
          user: req.user,
          error: firstError,
        });
      }

      return res.status(500).render("addBlog", {
        user: req.user,
        error: "Failed to create blog",
      });
    }
  }
);



router.post(
  "/comment/:blogId",
  async (req, res) => {

    try {

      const { content } = req.body;

      if (!content || !content.trim()) {

        return res.redirect(
          `/blog/${req.params.blogId}`
        );
      }

      await Comment.create({
        content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
      });

      return res.redirect(
        `/blog/${req.params.blogId}`
      );

    } catch (err) {

      console.error(err);

      return res.redirect(
        `/blog/${req.params.blogId}`
      );
    }
  }
);

module.exports = router;