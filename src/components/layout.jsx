import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  return (
    <>
      <header className="p-8 bg-gray-200/80">
        <Link to="/" className="flex items-center justify-center ">
          <img
            src={logo}
            alt="Casino lobby logo"
            width="60"
            height="60"
            className="w-1/2 md:w-1/10"
          />
        </Link>
      </header>

      <main className="p-4 xl:py-8 xl:px-64">{children}</main>
    </>
  );
};

export default Layout;
