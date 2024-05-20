import Quiz from "./quizModel.js"

export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}