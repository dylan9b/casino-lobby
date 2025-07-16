import { useEffect, useState } from "react";

function Games() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function getGames() {
      setIsLoading(true);

      try {
        const response = await fetch("src/assets/games.json");

        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await response.json();
        setGames(Object.values(data));
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    getGames();
  }, []);


//   return <> {error && <h1>Error occurred: {error.message}</h1>}</>;
return <>GAMES PAGE</>
}

export default Games;
