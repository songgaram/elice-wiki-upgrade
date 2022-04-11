import express from "express";
import { postRouter } from "../routes/postRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter);

export { app };
