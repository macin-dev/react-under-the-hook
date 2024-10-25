import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { Home } from "./Home";

const initialState = {
  questions: [],
  isLoading: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, isLoading: "ready" };
    case "dataFailed":
      return { ...state, isLoading: "error" };
    default:
      throw new Error("Type unknown");
  }
}

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, isLoading } = state;
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
        {isLoading === "ready" && <Home numQuestions={numQuestions} />}
      </Main>
    </div>
  );
};
