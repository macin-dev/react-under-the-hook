import { useReducer } from "react";
import { Child } from "./Child";

const initialState = { count: 0, step: 1 };

function reducer(cState, action) {
  console.log("reducer called");
  switch (action.type) {
    case "dec":
      return { ...cState, count: cState.count - cState.step };
    case "inc":
      return { ...cState, count: cState.count + cState.step };
    case "setCount":
      return { ...cState, count: action.payload };
    case "setStep":
      return { ...cState, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("Component logic rendering");

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate());

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    console.log("action dispatch");
    dispatch({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  console.log(state);

  return (
    <div className="counter">
      <Child />
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
