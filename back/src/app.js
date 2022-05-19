import cors from "cors";
import express from "express";
import { boardRouter } from "./routes/boardRouter";
import { commentRouter } from "./routes/commentRouter";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { swaggerUi, specs } from "./swagger";

const app = express();
// CORS 에러 방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("Elice Wiki");
});

app.use(boardRouter);
app.use(commentRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
// 에러 핸들링
app.use(errorMiddleware);

export { app };
