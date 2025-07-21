import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GamesContext from "../context/GamesProvider";
import { GameActions } from "../context/Game-actions-constants";

function Search() {
  const { dispatch } = useContext(GamesContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTermFromUrl = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(searchTermFromUrl);

  useEffect(() => {
    setInputValue(searchTermFromUrl);

    dispatch({
      type: GameActions.SET_FILTER,
      payload: { searchTerm: searchTermFromUrl },
    });
  }, [dispatch, searchTermFromUrl]);

  const updateUrlParams = (value = "") => {
    const newParams = new URLSearchParams(searchParams.toString());
    value ? newParams.set("search", value) : newParams.delete("search");
    setSearchParams(newParams);
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    updateUrlParams(trimmed);

    dispatch({
      type: GameActions.SET_FILTER,
      payload: {
        searchTerm: trimmed,
      },
    });
  };

  const handleClearSearch = () => {
    setInputValue("");
    updateUrlParams();

    dispatch({
      type: GameActions.UPDATE_FILTER,
      payload: { searchTerm: null },
    });

    dispatch({
      type: GameActions.SET_FILTER,
      payload: {
        searchTerm: null,
        offset: 0,
      },
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          placeholder="Type and press Enter"
          className="border rounded border-gray-200 px-4 py-3 w-full focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-teal-600/10"
          onChange={handleOnChange}
        />
        <button
          type="button"
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-2xl transition-opacity ${
            !inputValue ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleClearSearch}
          disabled={!inputValue}
          aria-label="Clear search"
        >
          &times;
        </button>
      </div>
    </form>
  );
}

export default Search;
