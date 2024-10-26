import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { Home } from "./Home";
import { Question } from "./Question";

const initialState = {
  questions: [],
  isLoading: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, isLoading: "ready" };
    case "dataFailed":
      return { ...state, isLoading: "error" };
    case "start":
      return { ...state, isLoading: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Type unknown");
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, isLoading, index, answer } = state;
  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {isLoading === "loading" && <Loader />}
        {isLoading === "error" && <Error />}
        {isLoading === "ready" && (
          <Home numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {isLoading === "active" && (
          <Question
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};
