import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";

interface QuestionType {
  type: "multiple" | "boolean";
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionProps {
  question: QuestionType;
  selectedAnswer: string;
  onAnswer: (a: string) => void;
}

const Question = ({ question, selectedAnswer, onAnswer }: QuestionProps) => {
  if (question.type === "multiple") {
    return (
      <MultipleChoiceQuestion
        question={{ ...question, type: "multiple" }}
        selectedAnswer={selectedAnswer}
        onAnswer={onAnswer}
      />
    );
  }

  return (
    <TrueFalseQuestion
      question={{ ...question, type: "boolean" }}
      selectedAnswer={selectedAnswer}
      onAnswer={onAnswer}
    />
  );
};

export default Question;
