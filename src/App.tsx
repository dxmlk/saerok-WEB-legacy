import { RouterProvider } from "react-router-dom";
import "./App.css";
import { createRouter } from "./routes";

function App() {
  const router = createRouter();
  return <RouterProvider router={router} />;
}

export default App;
