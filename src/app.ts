import express from "express";
import postsRouter from "./api/posts.routers";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import cors from "cors";
import morgan from "morgan";
import authorRouter from "./api/authors.routes";
import tagsRouter from "./api/tags.routers";

import path from "path";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/posts", postsRouter);
app.use("/authors", authorRouter);
app.use("/tags", tagsRouter);

// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(notFound);
app.use(errorHandler);
