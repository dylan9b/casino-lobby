import { useState } from "react";

function useInfiniteLoad(initialFilter) {
  const [filter, setFilter] = useState(initialFilter);

  const loadMore = () => {
    setFilter((prev) => ({
      ...prev,
      offset: prev.offset + prev.first,
    }));

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  return { filter, setFilter, loadMore };
}

export default useInfiniteLoad;
