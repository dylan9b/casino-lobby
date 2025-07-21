function Alert({ children, title }) {
  return (
    <div className="p-2 w-full text-center rounded border-b-amber-400 text-amber-800 bg-amber-400/30 ring-2 ring-offset-2 ring-amber-200 text-sm md:text-base">
      <p className="m-0">{title}</p>
      <small className="m-0">{children}</small>
    </div>
  );
}

export default Alert;
