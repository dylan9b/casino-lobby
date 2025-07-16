import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/routes";

function App() {
  return (
    <>
      <h1 className="bg-red-500 text-white font-xl">This is a test</h1>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
