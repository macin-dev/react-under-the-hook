import { Option } from "./Option";

export const Question = ({ question, answer, dispatch }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
};
