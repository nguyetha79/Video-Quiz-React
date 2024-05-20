import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./quizRoute.js";
import Quiz from "./quizModel.js";
import { quizData } from "./data/index.js";

dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Set up routes
app.use("/", routes);

/* Setup mongoose */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // Quiz.insertMany(quizData)
  })
  .catch((error) => console.log(`${error} did not connect`));
