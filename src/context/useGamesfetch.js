import { useEffect, useState } from "react";

export default function useGamesFetch() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      try {
        const response = await fetch("/games.json");
        if (!response.ok) throw new Error("Failed to fetch games");

        const rawData = await response.json();
        const allGames = Object.values(rawData);

        const filtered = allGames.filter((game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setGames(filtered);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();
  }, [searchTerm]);

  return {
    games,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    inputValue,
    setInputValue,
  };
}
