// PCPage.tsx
import React from "react";
import Footer from "../Footer";
import MainSection from "./MainSection";
import Header from "./TempHeader";
import MobileHeader from "./MobileHeader";
import { useWindowWidth } from "@/hooks/useWindowWidth";
const PCPage: React.FC = () => {
  const width = useWindowWidth();
  const isWide = width >= 1270;

  return (
    <>
      {isWide ? <Header /> : <MobileHeader />}
      <main className="w-full h-full z-20 relative border-t-3 border-mainBlue">
        <MainSection />
      </main>
      <Footer />
    </>
  );
};

export default PCPage;
