function NoGames() {
  return (
    <div className="p-2 w-full rounded border-b-amber-400 text-amber-800 bg-amber-400/30 ring-2 ring-offset-2 ring-amber-200 text-sm md:text-base">
      <p className="m-0">No games found with this filter.</p>
      <small className="m-0">Please try with something else.</small>
    </div>
  );
}

export default NoGames;
