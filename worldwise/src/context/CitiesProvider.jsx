import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL_API = "http://localhost:9000";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const resp = await fetch(`${BASE_URL_API}/cities`);
        const data = await resp.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const resp = await fetch(`${BASE_URL_API}/cities/${id}`);
      const data = await resp.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  const cities = useContext(CitiesContext);
  if (cities === undefined)
    throw new Error("The context was used outside of CitiesProvider");
  return cities;
}

export { CitiesProvider, useCities };