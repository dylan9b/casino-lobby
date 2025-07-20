import { Link } from "react-router-dom";

export function BackButton() {
  return (
    <Link
      to={"/"}
      className="cursor-pointer w-4 h-4 p-4 text-xl rounded-full border border-gray-200 bg-gray-200 text-gray-600 flex items-center justify-center duration-300 transition-all hover:scale-110 ring-2 ring-gray-400/30 focus"
    >
      &lsaquo;
    </Link>
  );
}

export default BackButton;
