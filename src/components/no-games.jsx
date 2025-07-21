import Alert from "./UI/Alert";

function NoGames() {
  return (
    <Alert title="No games found with this filter.">
      Please try with something else
    </Alert>
  );
}

export default NoGames;
