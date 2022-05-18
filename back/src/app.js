import express from "express";
import cors from "cors";
import { postRouter } from "./routes/postRouter";
import { tagRouter } from "./routes/tagRouter";
// import { errorMiddleware } from "./middlewares/errorMiddleware";

import { swaggerUi, specs } from "./swagger";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(postRouter);
app.use(tagRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
// app.use(errorMiddleware);

export { app };
