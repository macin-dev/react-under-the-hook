export const FinalScreen = ({
  points,
  maxPossiblePoints,
  highScore,
  dispatch,
}) => {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <div className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </div>
      <p className="highscore">High score: {highScore}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
};
