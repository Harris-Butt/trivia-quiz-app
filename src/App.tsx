import React, { useState } from "react";
import { Difficulty, fetchQuestions, QuestionState } from "./API";
import { QuestionCard } from "./Components/QuestionCard";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS: number = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const nextQuestion = async () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestion(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading ...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
}

export default App;
