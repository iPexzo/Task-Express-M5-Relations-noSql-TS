import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";
import Author from "../models/Author";

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find().populate("author");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, body, author } = req.body;
    const post = await Post.create({ title, body, author });
    const authorID = await Author.findByIdAndUpdate(author, {
      $push: { post: post._id },
    });

    post.save();
    res.status(201).json({
      post,
      authorID,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
};

export { getAllPosts, createPost, getPostById, updatePost, deletePost };
