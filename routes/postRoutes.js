const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).send("Title is required");
    }

    const newPost = await Post.create({
      title,
      content: content || ""
    });

    res.json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).send("Title is required");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content: content || ""
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).send("Post not found");
    }

    res.send("Post deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;