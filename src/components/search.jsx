import { useEffect, useState } from "react";
import { useGamesContext } from "../context/useGamesContext";
import { useSearchParams } from "react-router-dom";

function Search() {
  const { filter, setFilter } = useGamesContext();

  const [inputValue, setInputValue] = useState(filter.searchTerm || "");
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTermFromUrl = searchParams.get("search") || "";

  useEffect(() => {
    setInputValue(filter.searchTerm || "");
  }, [filter.searchTerm]);

  useEffect(() => {
    setFilter((prev) => {
      if (prev.searchTerm !== searchTermFromUrl) {
        return { ...prev, searchTerm: searchTermFromUrl };
      }
      return prev;
    });
  }, [searchTermFromUrl, setFilter]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, searchTerm: inputValue });

    updateUrlParams(inputValue);
  };

  const updateUrlParams = (value = "") => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }

    setSearchParams(newParams);
  };

  const handleClearSearch = () => {
    setInputValue("");
    setFilter({ ...filter, searchTerm: "" });
    updateUrlParams();
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
          }  absolute right-4 top-1/2 -translate-y-1/2 text-2xl`}
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
