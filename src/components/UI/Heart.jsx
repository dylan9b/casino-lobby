function Heart({ className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`w-4 h-4 flex rounded-full p-4 items-center justify-center cursor-pointer text-xl border border-current/30 ring-2 ring-current/10 duration-300 transition-all hover:scale-110 bg-red-50 ${className}`}
    >
      &hearts;
    </div>
  );
}

export default Heart;
