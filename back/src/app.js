import express from "express";
import { postRouter } from "./routes/postRouter";
import { tagRouter } from "./routes/tagRouter";
import { swaggerUi, specs } from "./swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter);
app.use(tagRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

export { app };
// https://llshl.tistory.com/49
