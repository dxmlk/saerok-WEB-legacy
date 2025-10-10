import { ReactComponent as RectangleEdge } from "@/assets/images/edge.svg";

interface SaerokCarouselCardProps {
  scale?: number;
}

const SaerokCarouselCard = ({ scale = 1 }: SaerokCarouselCardProps) => {
  return (
    <div
      className="slide shrink-0 w-343 h-455 flex justify-center items-center bg-background-lightWhitegray border-none rounded-20"
      style={{
        width: `${343 * scale}px`,
        height: `${455 * scale}px`,
        borderRadius: `${20 * scale}px`,
      }}
    >
      <main
        className="w-323 h-435 border-none rounded-10 bg-white"
        style={{ width: `${323 * scale}px`, height: `${435 * scale}px` }}
      >
        <section
          className="w-full h-350 relative"
          style={{ height: `${350 * scale}px` }}
        >
          <img
            className="absolute inset-0 w-full h-auto object-cover"
            src="/src/assets/images/BirdImg.png"
            alt="BirdImage"
          />
          <div className="absolute -bottom-6 left-0 flex -space-x-1 items-center">
            <div className="bg-background-white h-43 pl-12 pr-4 flex items-center">
              <span className="text-headline-2-2 font-moneygraphy text-black font-400">
                검은댕기수리
              </span>
            </div>
            <RectangleEdge />
          </div>
        </section>
        <section
          className="w-full h-85 pt-8 pb-9 pl-12 pr-9 flex flex-col text-caption-1 font-400 "
          style={{
            height: `${85 * scale}px`,
            paddingTop: `${8 * scale}px`,
            paddingBottom: `${9 * scale}px`,
            paddingLeft: `${12 * scale}px`,
            paddingRight: `${9 * scale}px`,
            fontSize: `${13 * scale}px`,
            lineHeight: `${16 * scale}px`,
          }}
        >
          <div
            className="w-full flex flex-row justify-between mb-2"
            style={{ marginBottom: `${2 * scale}px` }}
          >
            <span className="text-font-darkGray">21 February, 2025</span>
            <span className="text-font-gray">SRK-X1C2A</span>
          </div>
          <span className="text-font-darkGray ">성북천 다리 아래에서</span>
          <div
            className="text-mainBlue mt-18 space-x-3"
            style={{ marginTop: `${18 * scale}px` }}
          >
            <span>#일상속의탐조일지</span>
            <span className="font-700">#새록</span>
          </div>
        </section>
      </main>
    </div>
  );
};
export default SaerokCarouselCard;
