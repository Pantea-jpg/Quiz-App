import { useEffect, useState } from "react";
import Question from "./Question";
import "./QuizApp.css";

interface QuestionType {
  type: "multiple" | "boolean";
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizApp = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}`,
      );
      const data = await response.json();
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...(data.results ?? []),
      ]);
    };
    fetchData();
  }, [numberOfQuestions]);

  const handleAnswers = (questionIndex: number, answer: string) => {
    setAnswers((prevAnswers) => {
      if (prevAnswers[questionIndex] !== undefined) {
        return prevAnswers;
      }
      return { ...prevAnswers, [questionIndex]: answer };
    });
  };

  return (
    <main className="quiz-app">
      <header className="quiz-header">
        <h1>Quiz Time ✨</h1>

        <p>Challenge yourself and see how much you know!</p>

        <div className="question-count">{questions.length} Questions</div>
      </header>

      <div className="questions-list">
        {questions.map((q, i) => (
          <Question
            key={i}
            question={q}
            selectedAnswer={answers[i] ?? ""}
            onAnswer={(answer: string) => handleAnswers(i, answer)}
          />
        ))}
      </div>

      <div className="load-more-container">
        <button
          className="load-more-button"
          onClick={() => setNumberOfQuestions((s) => s + 10)}
        >
          Load More Questions →
        </button>
      </div>
    </main>
  );
};

export default QuizApp;
