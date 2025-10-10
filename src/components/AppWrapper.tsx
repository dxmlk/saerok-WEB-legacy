import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

const AppWrapper = () => {
  const DESIGN_HEIGHT = 925;
  const scale = window.innerHeight / DESIGN_HEIGHT;

  return (
    <div className="w-full min-h-100dvh bg-white overflow-x-hidden">
      <Header scale={scale} />
      <main className="w-full h-full z-20 relative border-t-3 border-mainBlue">
        <Outlet />
      </main>
      <Footer scale={scale} />
    </div>
  );
};

export default AppWrapper;
