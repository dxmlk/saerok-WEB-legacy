import GuideCTA from "@/features/home/sections/GuideCTA";
import Hero from "@/features/home/sections/Hero";
import SaerokPreview from "@/features/home/sections/SaerokPreivew";

const MainPage = () => {
  const DESIGN_HEIGHT = 925;
  const scale = window.innerHeight / DESIGN_HEIGHT;

  return (
    <div className="flex flex-col">
      <Hero scale={scale} />
      <SaerokPreview scale={scale} />
      <GuideCTA scale={scale} />
    </div>
  );
};

export default MainPage;
