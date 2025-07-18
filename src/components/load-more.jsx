function LoadMore({ isLoadLimitReached, loadMore }) {
  return (
    <button
      type="button"
      className={`mt-4 bg-teal-600 text-white px-4 py-2 rounded border border-teal-600 w-full md:w-auto focus-visible:outline-0 ${
        isLoadLimitReached
          ? "cursor-not-allowed opacity-45"
          : "cursor-pointer hover:bg-white hover:text-teal-600 transition-colors duration-300"
      }`}
      onClick={loadMore}
      disabled={isLoadLimitReached}
      aria-label="Load more games"
    >
      Load More
    </button>
  );
}

export default LoadMore;
