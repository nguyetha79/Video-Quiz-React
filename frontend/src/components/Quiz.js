import React, { useState } from "react";

/* Author: itsvinayak
Date: 13 Jun, 2023
Title of source code: Create a Quiz App using ReactJS
Type: source code
Web address: https://www.geeksforgeeks.org/create-a-quiz-app-using-reactjs/ */

const Quiz = ({ quizData, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  let isSelectedAnswer = quizData.answers.find(
    (a) => a.text === selectedAnswer
  );
  let isCorrect = isSelectedAnswer && isSelectedAnswer.correct;

  const resetState = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const checkAnswer = (answer, correct) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    resetState();
    onComplete();
  };

  /* Author: GreatStack
  Date: 15 Mar 2023
  Title of source code: How To Make Quiz App Using JavaScript | Build Quiz App With HTML CSS & JavaScript
  Type: source code
  Web address: https://www.youtube.com/watch?v=PBcqGxrr9g8&ab_channel=GreatStack */

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quizData.title}</h1>
      <div className="quiz">
        <h2 className="quiz-question">{quizData.question}</h2>
        <div className="quiz-answers">
          {quizData.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-btn ${
                selectedAnswer === answer.text
                  ? answer.correct
                    ? "bgr-correct"
                    : "bgr-incorrect"
                  : ""
              }`}
              onClick={() => checkAnswer(answer.text, answer.correct)}
              disabled={selectedAnswer !== null}
            >
              {answer.text}
            </button>
          ))}
        </div>
        {showFeedback && (
          <div
            className={`quiz-feedback ${
              isCorrect ? "color-correct" : "color-incorrect"
            }`}
          >
            {isCorrect
              ? quizData.feedback.correct
              : quizData.feedback.incorrect}
          </div>
        )}
        {selectedAnswer && (
          <button className="continue-btn" onClick={handleContinue}>
            Video abspielen
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
