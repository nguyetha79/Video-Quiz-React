import express from "express";
import { getQuizzes } from "./quizController.js";

// Create a router instance from Express
const router = express.Router();
router.get("/quizzes", getQuizzes);

// Export the router to be used in other parts of the application
export default router;
