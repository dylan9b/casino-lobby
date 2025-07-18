import { useEffect, useState } from "react";
import { useGamesContext } from "../context/useGamesContext";

function Search() {
  const { filter, setFilter } = useGamesContext();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(filter.searchTerm || "");
  }, [filter.searchTerm]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, searchTerm: inputValue });
  };

  const handleClearSearch = () => {
    setInputValue("");
    setFilter({ ...filter, searchTerm: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative">
        <input
          type="text"
          name="searchTerm"
          value={inputValue}
          placeholder="Type and press Enter"
          className="border rounded border-gray-200 px-8 py-2 w-full focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-teal-600/10"
          onChange={handleOnChange}
        />
        <button
          type="button"
          className={` ${
            !inputValue ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }  absolute right-4 top-1/2 -translate-y-1/2 text-2 xl`}
          onClick={handleClearSearch}
          disabled={!inputValue}
        >
          &times;
        </button>
      </div>
    </form>
  );
}

export default Search;
