import express from "express";
import { postRouter } from "./routes/postRouter";
import { tagRouter } from "./routes/tagRouter";
import { swaggerUi, specs } from "./swagger";
import cors from "cors";

const app = express();
app.use(cors());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter);
app.use(tagRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

export { app };
// https://llshl.tistory.com/49
