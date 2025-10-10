import IntroSection from "@/components/IntroSection";
import GuideMain from "@/features/guide/sections/GuideMain";

const GuidePage = () => {
  const DESIGN_HEIGHT = 925;
  const scale = window.innerHeight / DESIGN_HEIGHT;

  return (
    <div className="bg-background-lightWhitegray ">
      <IntroSection
        mainText="탐조는 어떻게 하나요?"
        subText="탐린이를 위한 새록의 탐조 가이드"
        isWhite={true}
        scale={scale}
      />
      <GuideMain scale={scale} />
    </div>
  );
};
export default GuidePage;
