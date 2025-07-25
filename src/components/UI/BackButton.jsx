import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleOnClick}
      className="cursor-pointer w-4 h-4 p-4 text-xl rounded-full border border-gray-200 bg-gray-200 text-gray-600 flex items-center justify-center duration-300 transition-all hover:scale-110 ring-2 ring-gray-400/30 focus"
    >
      &lsaquo;
    </button>
  );
}

export default BackButton;
