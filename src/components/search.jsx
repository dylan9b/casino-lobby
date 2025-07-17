import { useGamesContext } from "../context/useGamesContext";

function Search() {
  const { inputValue, setInputValue, setSearchTerm } = useGamesContext();

  const handleOnChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
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
