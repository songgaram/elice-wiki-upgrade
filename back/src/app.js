import cors from "cors";
import express from "express";
import { userRouter } from "../routes/userRouter"

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);

export {app}
