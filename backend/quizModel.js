import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  quizStartAt: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answers: [
    {
      text: {
        type: String,
        required: true
      },
      correct: {
        type: Boolean,
        required: true
      }
    }
  ],
  feedback: {
    correct: {
      type: String,
      required: true
    },
    incorrect: {
      type: String,
      required: true
    }
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
