// context/useGamesContext.js
import { useContext } from "react";
import { GamesContext } from "./GamesContext";

export function useGamesContext() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGamesContext must be used within a GamesProvider");
  }
  return context;
}
