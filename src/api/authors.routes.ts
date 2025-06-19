import express from "express";
import { getAllAuthor, createAuther } from "./authors.controllers";

const router = express.Router();

router.get("/", getAllAuthor);
router.post("/", createAuther);

export default router;
