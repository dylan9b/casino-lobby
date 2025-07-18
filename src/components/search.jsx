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

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="searchTerm"
        value={inputValue}
        placeholder="Type and press Enter"
        className="border rounded border-gray-200 px-8 py-2 w-full focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-teal-600/10"
        onChange={handleOnChange}
      />
    </form>
  );
}

export default Search;
