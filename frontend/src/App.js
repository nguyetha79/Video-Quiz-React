import Quiz from "./components/Quiz";
import VideoPlayer from "./components/VideoPlayer";
import React, { useRef, useState, useEffect } from "react";

function App() {
  const mainVideoRef = useRef(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [isPlaying, setIsPlaying] = useState();

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const response = await fetch('https://video-quiz-react.onrender.com/quizzes/'); 
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    }

    fetchQuizzes();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      mainVideoRef.current.pause();
    } else {
      mainVideoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleShowQuiz = () => {
    if (mainVideoRef.current) {
      const currentTime = mainVideoRef.current.currentTime;
      const quizTime = quizzes[currentQuizIndex]?.quizStartAt;

      console.log(
        `Current Time: ${currentTime}, Quiz Time: ${quizTime}, Show Quiz: ${showQuiz}`
      );

      if (currentTime >= quizTime && !showQuiz) {
        console.log("Showing Quiz");
        setShowQuiz(true);
        mainVideoRef.current.pause();
        setIsPlaying(!isPlaying)
      }
    }
  };

  const handleQuizComplete = () => {
    setShowQuiz(false);
    if (mainVideoRef.current) {
      mainVideoRef.current.play();
      setIsPlaying(!isPlaying)
    }
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <VideoPlayer
          ref={mainVideoRef}
          onTimeUpdate={handleShowQuiz}
          onPlayPause={handlePlayPause}
          isPlaying={isPlaying}
        />
        {showQuiz && (
          <Quiz
            quizData={quizzes[currentQuizIndex]}
            onComplete={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
