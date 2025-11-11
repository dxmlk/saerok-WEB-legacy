import GlassBall from "@/components/GlassBall";

import background from "@/assets/images/background.jpg";

const DictionaryPage = () => {
  const DESIGN_HEIGHT = 925;
  const scale = window.innerHeight / DESIGN_HEIGHT;

  return (
    <div className="relative h-full w-full">
      <img
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        src={background}
        alt=""
      />
      <GlassBall />
    </div>
  );
};

export default DictionaryPage;
