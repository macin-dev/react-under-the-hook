import { useEffect, useState } from "react";

const KEY = "2516960e";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );

        if (!resp.ok) throw new Error("Something went wrong fetching movies");

        const data = await resp.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  return {
    movies,
    isLoading,
    error,
  };
};
