import { Link } from "react-router-dom";

export function BackButton() {
  return (
    <Link
      to="/games"
      className="w-6 h-6 md:w-8 md:h-8 text-sm md:text-base rounded-full border border-gray-200 bg-gray-200 text--black flex items-center justify-center"
    >
      &lsaquo;
    </Link>
  );
}

export default BackButton;
