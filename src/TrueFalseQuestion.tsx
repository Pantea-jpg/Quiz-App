interface Question {
  type: "boolean";
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TrueFalseQuestionProps {
  question: Question;
  selectedAnswer: string;
  onAnswer: (a: string) => void;
}

const TrueFalseQuestion = ({
  question,
  selectedAnswer,
  onAnswer,
}: TrueFalseQuestionProps) => {
  const options = ["True", "False"].sort(() => Math.random() - 0.5);

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

      <div className="true-false-options">
        {options.map((option) => (
          <label className="true-false-option" key={option}>
            <input
              type="radio"
              name={`answer-${question.question}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={(e) => onAnswer(e.target.value)}
              disabled={selectedAnswer !== ""}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>

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

export default TrueFalseQuestion;
