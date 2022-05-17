import cors from "cors";
import express from "express";
import { userRouter } from "./routes/userRouter"
import { authRouter } from "./routes/authRouter"
import { adminRouter } from "./routes/adminRouter"
import { postRouter } from "./routes/postRouter";
import { tagRouter } from "./routes/tagRouter";
import { swaggerUi, specs } from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(adminRouter);
app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(tagRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

export { app };
// https://llshl.tistory.com/49
