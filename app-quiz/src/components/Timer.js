import { useEffect } from "react";

export const Timer = ({ dispatch, secondsRemaining }) => {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {min}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};
