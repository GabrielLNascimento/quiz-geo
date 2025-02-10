import { useState } from "react";
import useFetchQuestions from "../hooks/useFetchQuestions";
import Question from "./Question";

const Quiz = () => {
  const { questions, loading, error } = useFetchQuestions("/data/questions.json");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersStatus, setAnswersStatus] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  if (loading) return <p>Carregando perguntas...</p>;
  if (error) return <p>{error}</p>;

  const question = questions[currentQuestion];

  const handleAnswerClick = (option) => {
    const isCorrect = option === question.answer;
    const updatedStatus = [...answersStatus];
    updatedStatus[currentQuestion] = isCorrect ? "correct" : "incorrect";

    setAnswersStatus(updatedStatus);
    setSelectedAnswer(option);

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    }, 1000);
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="quiz-container">
        <h2>Quiz Finalizado! 🎉</h2>
        <p className="score">
          Você acertou <strong>{score}</strong> de {questions.length} perguntas!
        </p>
        <button className="restart-btn" onClick={restartQuiz}>
          🔄 Reiniciar Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="question-numbers">
        {questions.map((_, index) => (
          <span
            key={index}
            className={`question-number ${
              answersStatus[index] === "correct"
                ? "correct"
                : answersStatus[index] === "incorrect"
                ? "incorrect"
                : ""
            }`}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <Question
        question={question.question}
        options={question.options}
        correctAnswer={question.answer}
        onAnswer={handleAnswerClick}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
};

export default Quiz;
