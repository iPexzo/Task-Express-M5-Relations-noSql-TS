import { NextFunction, Request, Response } from "express";
import Tags from "../models/Tag";
import Post from "../models/Post";
import Tag from "../models/Tag";

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await Tag.find().populate("posts");
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

export const createTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, posts } = req.body;
    const tag = await Tag.create({ name, posts });
    const postID = await Post.findByIdAndUpdate(posts, {
      $push: { tags: tag._id },
    });

    res.status(201).json({
      tag,
      postID,
    });
  } catch (error) {
    next(error);
  }
};

export const addTagToPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, tagId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, {
      $push: { tags: tagId },
    });

    const tag = await Tag.findByIdAndUpdate(tagId, {
      $push: { posts: postId },
    });

    res.status(200).json({ tag, post });
  } catch (error) {
    next(error);
  }
};
