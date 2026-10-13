interface Question {
  type: "multiple";
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface MultipleQuestionProps {
  question: Question;
  selectedAnswer: string;
  onAnswer: (a: string) => void;
}

const MultipleChoiceQuestion = ({
  question,
  selectedAnswer,
  onAnswer,
}: MultipleQuestionProps) => {
  const options = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5,
  );

  return (
    <div
      className={`question-card ${
        selectedAnswer
          ? selectedAnswer === question.correct_answer
            ? "answered-correct"
            : "answered-wrong"
          : ""
      }`}
    >
      <div className="question-meta">
        <span className="question-badge">{question.category}</span>
        <span className="question-badge difficulty">{question.difficulty}</span>
      </div>

      <h2>{question.question}</h2>

      <select
        className="answer-select"
        value={selectedAnswer}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={selectedAnswer !== ""}
      >
        <option value="" disabled>
          Choose your answer...
        </option>

        {options.map((o, i) => (
          <option key={i} value={o}>
            {o}
          </option>
        ))}
      </select>

      {selectedAnswer !== "" && (
        <p
          className={`answer-feedback ${
            selectedAnswer === question.correct_answer ? "correct" : "wrong"
          }`}
        >
          {selectedAnswer === question.correct_answer
            ? "✓ Correct! Great job!"
            : `✗ Incorrect! Correct answer: ${question.correct_answer}`}
        </p>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
