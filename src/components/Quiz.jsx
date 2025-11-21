import { useState, useCallback } from "react";
import QuestionTimer from "./QuestionTimer";
import questions from "../utils/questions";
import quizCompleteImage from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestion = questions[userAnswers.length];
  const isQuizEnd = userAnswers.length === questions.length;

  const handleAnswerSelect = useCallback(function handleAnswerSelect(
    selectedAnswer
  ) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  },
  []);

  const onTimeout = useCallback(
    function onTimeout() {
      handleAnswerSelect(null);
    },
    [handleAnswerSelect]
  );
  if (isQuizEnd) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="Trophy Logo" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...currentQuestion.answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestion.id}
          timeout={10000}
          onTimeout={onTimeout}
        />
        <h2>{currentQuestion.text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li className="answer" key={answer}>
              <button onClick={() => handleAnswerSelect(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
