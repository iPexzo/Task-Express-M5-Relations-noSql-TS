import { NextFunction, Request, Response } from "express";
import Author from "../models/Author";
import Post from "../models/Post";

export const getAllAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Author.find().populate("post");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createAuther = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, post } = req.body;
    const author = await Author.create({ name, post });
    const postId = await Post.findByIdAndUpdate(post, {
      $push: { author: author._id },
    });
    res.status(201).json({ author, postId });
  } catch (error) {
    next(error);
  }
};
