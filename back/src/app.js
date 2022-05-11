import express from "express";
import { postRouter } from "../routes/postRouter";
import { tagRouter } from "../routes/tagRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter);
app.use(tagRouter);

export { app };
