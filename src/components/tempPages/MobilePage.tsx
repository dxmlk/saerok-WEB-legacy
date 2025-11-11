import Footer from "../Footer";
import MainSection from "./MainSection";
import MobileHeader from "./MobileHeader";

const MobilePage = () => {
  return (
    <>
      <MobileHeader />
      <main className="w-full h-full z-20 relative border-t-3 border-mainBlue">
        <MainSection isMobile={true} />
      </main>
      <Footer isMobile={true} />
    </>
  );
};

export default MobilePage;
