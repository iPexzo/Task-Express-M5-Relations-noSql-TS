import express from "express";
import { addTagToPost, createTags, getAllTags } from "./tags.controller";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", createTags);
router.put("/:postId/:tagId", addTagToPost);

export default router;
