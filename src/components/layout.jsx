import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center p-8 bg-gray-200/80">
        <img
          src={logo}
          alt="Casino lobby logo"
          width="60"
          height="60"
          className="w-1/2 md:w-auto"
        />
      </header>

      <main className="p-4 xl:py-30 xl:px-64">{children}</main>
    </>
  );
};

export default Layout;
